export const INQUIRY_SENT_KEY = "wb-inquiry-sent";
export const INQUIRY_SENT_EVENT = "wb-inquiry-sent";

export function readInquirySent() {
  try {
    return sessionStorage.getItem(INQUIRY_SENT_KEY) === "1";
  } catch {
    return false;
  }
}

export function markInquirySent() {
  try {
    sessionStorage.setItem(INQUIRY_SENT_KEY, "1");
  } catch {
    /* storage can be blocked; the form still shows its own success state */
  }
  window.dispatchEvent(new Event(INQUIRY_SENT_EVENT));
}
