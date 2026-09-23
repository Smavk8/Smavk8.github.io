/**
 * Forwarding alias to /api/audit
 */
import { onRequestGet as auditGet, onRequestPost as auditPost, onRequestOptions as auditOptions } from './audit.js';

export const onRequestGet = auditGet;
export const onRequestPost = auditPost;
export const onRequestOptions = auditOptions;
