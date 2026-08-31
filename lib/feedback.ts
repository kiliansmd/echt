export type FeedbackKind="success"|"error"|"selection";
export function triggerFeedback(kind:FeedbackKind){if(typeof navigator==="undefined"||!("vibrate" in navigator))return; navigator.vibrate(kind==="success"?[20,30,20]:kind==="error"?[40,30,40]:10)}
