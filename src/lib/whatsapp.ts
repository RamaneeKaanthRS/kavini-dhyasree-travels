export const WHATSAPP_PHONE_NUMBER = '919489648021';
export const WHATSAPP_PHONE_DISPLAY = '+91 94896 48021';

/**
 * Creates a formatted wa.me URL for the primary WhatsApp contact.
 */
export function getWhatsAppUrl(message?: string): string {
  const base = `https://wa.me/${WHATSAPP_PHONE_NUMBER}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message.trim())}`;
}

/**
 * Opens a WhatsApp chat in a new tab with the provided message.
 */
export function openWhatsAppChat(message?: string): void {
  const url = getWhatsAppUrl(message);
  if (typeof window !== 'undefined') {
    window.open(url, '_blank', 'noopener,noreferrer');
  }
}

/**
 * Builds dynamic WhatsApp message for vehicle and travel services.
 * Follows required prompt format:
 * "Hey, I want to know the price of Swift"
 * "Hey, I want to know the price of Swift for 2 days."
 * "Hey, I want to know the price of Innova for 2 days with pickup and drop."
 */
export function buildVehicleEnquiryMessage(options: {
  vehicleName: string;
  duration?: string;
  serviceOption?: string;
  additionalNotes?: string;
}): string {
  const { vehicleName, duration, serviceOption, additionalNotes } = options;

  let msg = `Hey, I want to know the price of ${vehicleName}`;

  if (duration && duration !== 'Single Trip' && duration !== 'General') {
    msg += ` for ${duration.toLowerCase()}`;
  }

  if (serviceOption && serviceOption !== 'Standard') {
    msg += ` with ${serviceOption.toLowerCase()}`;
  }

  msg += '.';

  if (additionalNotes && additionalNotes.trim()) {
    msg += ` Note: ${additionalNotes.trim()}`;
  }

  return msg;
}

/**
 * Builds dynamic WhatsApp message for off-road and Yercaud experiences.
 */
export function buildExperienceEnquiryMessage(options: {
  title: string;
  routeType?: string;
  groupSize?: string;
}): string {
  const { title, routeType, groupSize } = options;
  let msg = `Hey, I want to know the price and availability for ${title}`;
  if (routeType) {
    msg += ` (${routeType})`;
  }
  if (groupSize) {
    msg += ` for a group of ${groupSize}`;
  }
  msg += '.';
  return msg;
}

/**
 * Builds dynamic WhatsApp message for rooms and cottage accommodation.
 */
export function buildRoomEnquiryMessage(options: {
  roomName: string;
  guests?: string | number;
  duration?: string;
  isEnquiryOnly?: boolean;
}): string {
  const { roomName, guests, duration, isEnquiryOnly } = options;
  let msg = `Hey, I want to know the price and availability of ${roomName}`;
  if (guests) {
    msg += ` for ${guests}`;
  }
  if (duration) {
    msg += ` for ${duration}`;
  }
  if (!isEnquiryOnly) {
    msg += ' (Starting from ₹1,999/day).';
  } else {
    msg += '.';
  }
  return msg;
}

