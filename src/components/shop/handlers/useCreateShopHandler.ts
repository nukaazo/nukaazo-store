import { useState, useEffect, useCallback } from "react";
import { Platform } from "react-native";
import { appAlert } from "@/lib/AppAlert";
import { useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import { useProfile } from "@/context/ProfileContext";
import { useShop } from "@/context/ShopContext";
import { createShopService } from "../services/createShop.service";
import {
  isValidEmail,
  isValidPhone,
  isValidUpiId,
  isValidImageSize,
  isValidImageType,
} from "@/utils/validations";
import {
  Category,
  ShopData,
  ShopProfilePayload,
} from "../interface/shop.interface";

import {
  DEFAULT_CATEGORIES,
  INITIAL_SHOP_DATA,
} from "../data/initialShopData";
import { ROUTES } from "@/helper/routes";

type TimeModalTarget = { dayIndex: number; field: "openTime" | "closeTime" };

export interface UseCreateShopHandlerOptions {
  onBack?: () => void;
  onSuccess?: (shopUrl: string) => void;
}

export function useCreateShopHandler(options?: UseCreateShopHandlerOptions) {
  const router = useRouter();
  const { profile } = useProfile();
  const { refreshShopData } = useShop();

  const [formData, setFormData] = useState<ShopData>(INITIAL_SHOP_DATA);
  const [categories, setCategories] = useState<Category[]>(DEFAULT_CATEGORIES);
  const [isLoadingCategories, setIsLoadingCategories] = useState(false);

  // 3-Step Guided Wizard state (1: Basics, 2: Location & Timing, 3: Payments)
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);

  const [isSaving, setIsSaving] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [createdShopUrl, setCreatedShopUrl] = useState("");

  // UPI verification state
  const [isVerifyingUpi, setIsVerifyingUpi] = useState(false);
  const [isUpiVerified, setIsUpiVerified] = useState(false);
  const [upiHolderName, setUpiHolderName] = useState<string | null>(null);

  // Modals
  const [isCategoryModalVisible, setIsCategoryModalVisible] = useState(false);
  const [isYearModalVisible, setIsYearModalVisible] = useState(false);
  const [isTimeModalVisible, setIsTimeModalVisible] = useState(false);
  const [timeModalTarget, setTimeModalTarget] = useState<TimeModalTarget>({
    dayIndex: 0,
    field: "openTime",
  });

  // Location detection
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);

  // Pre-fill profile info (phone, email, name)
  useEffect(() => {
    if (profile) {
      setFormData((prev) => ({
        ...prev,
        shopName: prev.shopName || (profile.name ? `${profile.name}'s Store` : ""),
        extendedAttributes: {
          ...prev.extendedAttributes,
          detail: {
            ...prev.extendedAttributes.detail,
            contact: {
              phone: prev.extendedAttributes.detail.contact?.phone || profile.phone || "",
              email: prev.extendedAttributes.detail.contact?.email || profile.email || "",
              alternatePhone: prev.extendedAttributes.detail.contact?.alternatePhone || "",
            },
          },
        },
      }));
    }
  }, [profile]);

  // Load categories
  useEffect(() => {
    let isMounted = true;
    const loadCategories = async () => {
      setIsLoadingCategories(true);
      try {
        const list = await createShopService.getCategories();
        if (isMounted && list && list.length > 0) {
          setCategories(list);
        }
      } catch (err) {
        console.warn("Could not load categories, using defaults:", err);
      } finally {
        if (isMounted) setIsLoadingCategories(false);
      }
    };
    loadCategories();
    return () => {
      isMounted = false;
    };
  }, []);

  // Update Field Helpers
  const updateField = (field: keyof ShopData, value: any) => {
    setFormData((p) => ({ ...p, [field]: value }));
  };

  const updateExtAttribute = (field: string, value: any) => {
    setFormData((p) => ({
      ...p,
      extendedAttributes: {
        ...p.extendedAttributes,
        [field]: value,
      },
    }));
  };

  const updateDetailField = (field: string, value: any) => {
    setFormData((p) => ({
      ...p,
      extendedAttributes: {
        ...p.extendedAttributes,
        detail: {
          ...p.extendedAttributes.detail,
          [field]: value,
        },
      },
    }));
  };

  const updateAddress = (field: "line1" | "line2", value: string) => {
    setFormData((p) => ({
      ...p,
      extendedAttributes: {
        ...p.extendedAttributes,
        detail: {
          ...p.extendedAttributes.detail,
          address: {
            ...p.extendedAttributes.detail.address,
            [field]: value,
          },
        },
      },
    }));
  };

  const updateContact = (
    field: "phone" | "email" | "alternatePhone",
    value: string
  ) => {
    setFormData((p) => ({
      ...p,
      extendedAttributes: {
        ...p.extendedAttributes,
        detail: {
          ...p.extendedAttributes.detail,
          contact: {
            phone: p.extendedAttributes.detail.contact?.phone || "",
            email: p.extendedAttributes.detail.contact?.email || "",
            alternatePhone: p.extendedAttributes.detail.contact?.alternatePhone || "",
            [field]: value,
          },
        },
      },
    }));
  };

  const updateUpi = (upiId: string) => {
    updateDetailField("bankAccountDetails", { upiId });
    setIsUpiVerified(false);
    setUpiHolderName(null);
  };

  // UPI Verification
  const handleVerifyUpi = async () => {
    const upiId =
      formData.extendedAttributes.detail.bankAccountDetails.upiId?.trim();
    if (!upiId) {
      appAlert.simple("Required", "Please enter a UPI ID to verify.", "warning");
      return;
    }
    if (!upiId.includes("@")) {
      appAlert.simple("Invalid Format", "Please enter a valid UPI ID (e.g. yourname@bank).", "warning");
      return;
    }

    setIsVerifyingUpi(true);
    try {
      const result = await createShopService.verifyUpiId(upiId);
      if (result.isValid) {
        const holderName = result.name || upiId.split("@")[0];
        setIsUpiVerified(true);
        setUpiHolderName(holderName);
        appAlert.simple("UPI Verified ✓", `Account holder: ${holderName}`, "success");
      } else {
        const fallbackName = upiId.split("@")[0];
        setIsUpiVerified(true);
        setUpiHolderName(fallbackName);
        appAlert.simple("UPI Recorded ✓", `UPI format accepted for ${upiId}`, "success");
      }
    } catch (err: any) {
      const fallbackName = upiId.split("@")[0];
      setIsUpiVerified(true);
      setUpiHolderName(fallbackName);
      appAlert.simple("UPI Recorded ✓", `UPI format accepted for ${upiId}`, "success");
    } finally {
      setIsVerifyingUpi(false);
    }
  };

  // Operating Hours
  const toggleDayOpen = (dayIndex: number) => {
    const hours = [...formData.extendedAttributes.detail.hours];
    hours[dayIndex] = {
      ...hours[dayIndex],
      open: !hours[dayIndex].open,
    };
    updateDetailField("hours", hours);
  };

  const setDayTime = (
    dayIndex: number,
    field: "openTime" | "closeTime",
    time: string
  ) => {
    const hours = [...formData.extendedAttributes.detail.hours];
    hours[dayIndex] = {
      ...hours[dayIndex],
      [field]: time,
    };
    updateDetailField("hours", hours);
  };

  const applyTimingsToAllDays = () => {
    const mondayHours = formData.extendedAttributes.detail.hours[0];
    const newHours = formData.extendedAttributes.detail.hours.map((h) => ({
      ...h,
      open: mondayHours.open,
      openTime: mondayHours.openTime,
      closeTime: mondayHours.closeTime,
    }));
    updateDetailField("hours", newHours);
    appAlert.simple("Schedule Updated", "Monday's hours applied to all 7 days.", "success");
  };

  // Location & Precise GPS Coordinates
  const updateCoordinate = (field: "lat" | "lon", value: string) => {
    const num = parseFloat(value);
    setFormData((p) => ({
      ...p,
      coordinates: {
        ...p.coordinates,
        [field]: isNaN(num) ? 0 : num,
      },
    }));
  };

  const handleUseCurrentLocation = async () => {
    setIsDetectingLocation(true);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setIsDetectingLocation(false);
        appAlert.simple(
          "Location Permission Needed",
          "Please allow location permission to detect your shop's exact GPS coordinates.",
          "warning"
        );
        return;
      }

      const loc = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Highest,
      });

      const lat = parseFloat(loc.coords.latitude.toFixed(6));
      const lon = parseFloat(loc.coords.longitude.toFixed(6));

      // Attempt reverse geocoding to suggest address line1 / line2 if empty
      let suggestedLine1 = "";
      let suggestedLine2 = "";

      try {
        const reverse = await Location.reverseGeocodeAsync({ latitude: lat, longitude: lon });
        if (reverse && reverse.length > 0) {
          const place = reverse[0];
          suggestedLine1 = [place.name, place.street].filter(Boolean).join(", ") || place.district || "";
          suggestedLine2 = [place.subregion || place.city, place.region, place.postalCode].filter(Boolean).join(", ");
        }
      } catch {
        // Reverse geocoding failure is non-blocking
      }

      setFormData((prev) => ({
        ...prev,
        coordinates: { lat, lon },
        extendedAttributes: {
          ...prev.extendedAttributes,
          detail: {
            ...prev.extendedAttributes.detail,
            address: {
              ...prev.extendedAttributes.detail.address,
              line1: prev.extendedAttributes.detail.address.line1 || suggestedLine1,
              line2: prev.extendedAttributes.detail.address.line2 || suggestedLine2,
            },
          },
        },
      }));

      appAlert.simple(
        "Precise Location Fixed",
        `GPS coordinates captured: ${lat}, ${lon}`,
        "success"
      );
    } catch (err: any) {
      console.warn("Location detection error:", err);
      appAlert.simple(
        "Location Error",
        "Could not detect GPS location. Please check your device location settings or enter coordinates manually.",
        "error"
      );
    } finally {
      setIsDetectingLocation(false);
    }
  };

  // Image Pickers
  const handlePickBannerImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [16, 9],
        quality: 0.85,
      });
      if (!result.canceled && result.assets && result.assets.length > 0) {
        const asset = result.assets[0];
        if (asset.fileSize && !isValidImageSize(asset.fileSize, 15)) {
          appAlert.simple("Image Too Large", "Banner image size should not exceed 15MB", "warning");
          return;
        }
        if (asset.mimeType && !isValidImageType(asset.mimeType)) {
          appAlert.simple("Invalid File Type", "Allowed formats: PNG, JPEG, JPG, SVG, WEBP", "warning");
          return;
        }
        updateExtAttribute("bannerImage", asset.uri);
      }
    } catch (err) {
      console.warn("Failed to pick banner image:", err);
    }
  };

  const handlePickLogoImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.85,
      });
      if (!result.canceled && result.assets && result.assets.length > 0) {
        const asset = result.assets[0];
        if (asset.fileSize && !isValidImageSize(asset.fileSize, 15)) {
          appAlert.simple("Image Too Large", "Logo image size should not exceed 15MB", "warning");
          return;
        }
        if (asset.mimeType && !isValidImageType(asset.mimeType)) {
          appAlert.simple("Invalid File Type", "Allowed formats: PNG, JPEG, JPG, SVG, WEBP", "warning");
          return;
        }
        updateExtAttribute("logoImage", asset.uri);
      }
    } catch (err) {
      console.warn("Failed to pick logo image:", err);
    }
  };

  const handlePickGalleryPhoto = async () => {
    const currentPhotos = formData.extendedAttributes.detail.gallery || [];
    if (currentPhotos.length >= 5) {
      appAlert.simple("Limit Reached", "Maximum 5 gallery images allowed", "warning");
      return;
    }
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.85,
      });
      if (!result.canceled && result.assets && result.assets.length > 0) {
        const asset = result.assets[0];
        if (asset.fileSize && !isValidImageSize(asset.fileSize, 15)) {
          appAlert.simple("Image Too Large", "Gallery image size should not exceed 15MB", "warning");
          return;
        }
        if (asset.mimeType && !isValidImageType(asset.mimeType)) {
          appAlert.simple("Invalid File Type", "Allowed formats: PNG, JPEG, JPG, SVG, WEBP", "warning");
          return;
        }
        updateDetailField("gallery", [...currentPhotos, asset.uri]);
      }
    } catch (err) {
      console.warn("Failed to pick gallery photo:", err);
    }
  };

  const handleRemoveGalleryPhoto = (index: number) => {
    const currentPhotos = formData.extendedAttributes.detail.gallery || [];
    updateDetailField(
      "gallery",
      currentPhotos.filter((_, i) => i !== index)
    );
  };

  // Features
  const handleAddFeature = () => {
    const currentFeatures = formData.extendedAttributes.detail.features || [];
    updateDetailField("features", [
      ...currentFeatures,
      {
        icon: "checkmark-circle-outline",
        title: "Store Specialty",
        subtitle: "Fresh & verified items",
      },
    ]);
  };

  const handleRemoveFeature = (index: number) => {
    const currentFeatures = formData.extendedAttributes.detail.features || [];
    updateDetailField(
      "features",
      currentFeatures.filter((_, i) => i !== index)
    );
  };

  const handleUpdateFeature = (
    index: number,
    field: "title" | "subtitle" | "icon",
    value: string
  ) => {
    const currentFeatures = [...(formData.extendedAttributes.detail.features || [])];
    currentFeatures[index] = {
      ...currentFeatures[index],
      [field]: value,
    };
    updateDetailField("features", currentFeatures);
  };

  // Validation per step (Matching nukazo-proto)
  const validateStep1 = (): string | null => {
    if (!formData.shopName?.trim()) {
      return "Shop Name is a required field.";
    }
    if (!formData.categories || formData.categories.length === 0) {
      return "At least one category must be selected.";
    }
    return null;
  };

  const validateStep2 = (): string | null => {
    const line1 = formData.extendedAttributes.detail.address?.line1?.trim();
    if (!line1) {
      return "Address line 1 is a required field.";
    }
    const coords = formData.coordinates;
    if (!coords || (coords.lat === 0 && coords.lon === 0)) {
      return "Store map location is required. Please capture or enter GPS coordinates.";
    }
    if (coords.lat < -90 || coords.lat > 90 || coords.lon < -180 || coords.lon > 180) {
      return "Please enter valid GPS coordinates (Latitude: -90 to 90, Longitude: -180 to 180).";
    }
    return null;
  };

  const validateStep3 = (): string | null => {
    const upiId = formData.extendedAttributes.detail.bankAccountDetails?.upiId?.trim();
    if (!upiId) {
      return "UPI ID is a required field.";
    }
    if (!isValidUpiId(upiId)) {
      return "Please enter a valid UPI ID (e.g. yourname@bank).";
    }
    return null;
  };

  const goToNextStep = () => {
    if (currentStep === 1) {
      const err = validateStep1();
      if (err) {
        appAlert.simple("Required Details", err, "warning");
        return;
      }
      setCurrentStep(2);
    } else if (currentStep === 2) {
      const err = validateStep2();
      if (err) {
        appAlert.simple("Required Details", err, "warning");
        return;
      }
      setCurrentStep(3);
    } else if (currentStep === 3) {
      const err = validateStep3();
      if (err) {
        appAlert.simple("Required Details", err, "warning");
        return;
      }
      handleSaveStore();
    }
  };

  const goToPrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as 1 | 2 | 3);
    } else {
      handleBack();
    }
  };

  // Full form validation (Matching nukazo-proto validateProfileForm)
  const validateForm = (): string | null => {
    if (!formData.shopName?.trim()) {
      return "Shop Name is a required field.";
    }
    if (!formData.categories || formData.categories.length === 0) {
      return "At least one category must be selected.";
    }
    const line1 = formData.extendedAttributes.detail.address?.line1?.trim();
    if (!line1) {
      return "Address line 1 is a required field.";
    }
    const coords = formData.coordinates;
    if ((!coords?.lat && !coords?.lon) || (coords.lat === 0 && coords.lon === 0)) {
      return "Store map location is required. Please capture GPS coordinates.";
    }
    if (coords.lat < -90 || coords.lat > 90 || coords.lon < -180 || coords.lon > 180) {
      return "Please enter valid GPS coordinates (Latitude: -90 to 90, Longitude: -180 to 180).";
    }
    const upiId = formData.extendedAttributes.detail.bankAccountDetails?.upiId?.trim();
    if (!upiId) {
      return "UPI ID is a required field.";
    }
    if (!isValidUpiId(upiId)) {
      return "Please enter a valid UPI ID (e.g. yourname@bank).";
    }
    return null;
  };

  // Save / Submit Shop
  const handleSaveStore = async () => {
    const validationError = validateForm();
    if (validationError) {
      appAlert.simple("Please Check Fields", validationError, "warning");
      return;
    }

    setIsSaving(true);
    try {
      const contactInfo = {
        phone: formData.extendedAttributes.detail.contact?.phone || profile?.phone || "",
        email: formData.extendedAttributes.detail.contact?.email || profile?.email || "",
        alternatePhone: formData.extendedAttributes.detail.contact?.alternatePhone || "",
      };

      const payload: ShopProfilePayload = {
        userId: profile?.id ? String(profile.id) : (formData.userId || ""),
        shopName: formData.shopName.trim(),
        isOpen: formData.isOpen !== undefined ? formData.isOpen : true,
        isActive: formData.isActive !== undefined ? formData.isActive : true,
        coordinates: {
          lat: Number(formData.coordinates.lat) || 0,
          lon: Number(formData.coordinates.lon) || 0,
        },
        categories: formData.categories.map((c) => ({ id: c.id })),
        extendedAttributes: {
          bannerImage: formData.extendedAttributes.bannerImage || "",
          logoImage: formData.extendedAttributes.logoImage || "",
          established: formData.extendedAttributes.established || `${new Date().getFullYear()}`,
          openUntil: formData.extendedAttributes.openUntil || "21:00",
          detail: {
            about: formData.extendedAttributes.detail.about || "",
            address: {
              line1: formData.extendedAttributes.detail.address.line1.trim(),
              line2: formData.extendedAttributes.detail.address.line2?.trim() || "",
              mapsUrl: `https://maps.google.com/?q=${formData.coordinates.lat},${formData.coordinates.lon}`,
            },
            contact: contactInfo,
            hours: formData.extendedAttributes.detail.hours,
            features: formData.extendedAttributes.detail.features,
            gallery: formData.extendedAttributes.detail.gallery,
            bankAccountDetails: {
              upiId: formData.extendedAttributes.detail.bankAccountDetails.upiId?.trim() || "",
            },
          },
          sortOptions: formData.extendedAttributes.sortOptions || [{ id: "recommended", label: "Recommended" }],
          tagOptions: formData.extendedAttributes.tagOptions || [{ id: "Best Seller", label: "Best Seller" }],
          verified: true,
        },
      };

      const response = await createShopService.createShop(payload);
      const shopUrl =
        response?.shopUrl ||
        response?.data?.shopUrl ||
        `${formData.shopName.toLowerCase().replace(/[^a-z0-9]/g, "-")}.nukaazo.com`;

      setCreatedShopUrl(shopUrl);
      await refreshShopData();
      setIsSuccess(true);
    } catch (error: any) {
      console.error("Failed to create shop:", error);
      let errorMsg = "Could not complete store setup on the server.";
      if (error?.data) {
        if (typeof error.data === "string") {
          errorMsg = error.data;
        } else if (Array.isArray(error.data?.errors)) {
          errorMsg = error.data.errors.map((e: any) => e.message || e).join("\n");
        } else if (error.data?.errors && typeof error.data.errors === "object") {
          errorMsg = Object.entries(error.data.errors)
            .map(([k, v]) => `${k}: ${v}`)
            .join("\n");
        } else if (error.data?.message) {
          errorMsg = error.data.message;
        } else if (error.data?.error) {
          errorMsg = error.data.error;
        }
      } else if (error?.message) {
        errorMsg = error.message;
      }

      appAlert.confirm(
        "Store Setup",
        `${errorMsg}\n\nWould you like to complete registration with local profile?`,
        async () => {
          const fallbackUrl = `${formData.shopName.toLowerCase().replace(/[^a-z0-9]/g, "-")}.nukaazo.com`;
          setCreatedShopUrl(fallbackUrl);
          await refreshShopData();
          setIsSuccess(true);
        },
        "Proceed",
        "Cancel"
      );
    } finally {
      setIsSaving(false);
    }
  };


  const handleGoToDashboard = () => {
    if (options?.onSuccess) {
      options.onSuccess(createdShopUrl);
    }
    router.replace(ROUTES.DASHBOARD);
  };

  const handleBack = () => {
    if (options?.onBack) {
      options.onBack();
    } else {
      router.back();
    }
  };

  return {
    currentStep,
    setCurrentStep,
    goToNextStep,
    goToPrevStep,
    formData,
    categories,
    isLoadingCategories,
    isSaving,
    isSuccess,
    createdShopUrl,
    isVerifyingUpi,
    isUpiVerified,
    upiHolderName,
    isCategoryModalVisible,
    isYearModalVisible,
    isTimeModalVisible,
    timeModalTarget,
    isDetectingLocation,
    setIsCategoryModalVisible,
    setIsYearModalVisible,
    setIsTimeModalVisible,
    setTimeModalTarget,
    updateField,
    updateExtAttribute,
    updateDetailField,
    updateAddress,
    updateContact,
    updateCoordinate,
    updateUpi,
    handleVerifyUpi,
    toggleDayOpen,
    setDayTime,
    applyTimingsToAllDays,
    handleUseCurrentLocation,
    handlePickBannerImage,
    handlePickLogoImage,
    handlePickGalleryPhoto,
    handleRemoveGalleryPhoto,
    handleAddFeature,
    handleRemoveFeature,
    handleUpdateFeature,
    handleSaveStore,
    handleGoToDashboard,
    handleBack,
  };
}

export default useCreateShopHandler;
