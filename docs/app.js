"use strict";

const field = (id, label, type = "text", options = {}) => ({ id, label, type, ...options });
const section = (title, fields, help = "") => ({ title, fields, help });

const recurrenceOptions = ["First time", "Intermittent", "Recurring"];
const urgencyOptions = ["Can wait", "ASAP", "Critical — classroom impact or unable to work"];
const yesNoUnknown = ["No", "Yes", "Unknown"];

const ticketTemplates = [
  {
    id: "super-simple",
    group: "General support",
    short: "Super Simple",
    title: "Super Simple Support Ticket",
    description: "A quick support request containing the essential issue, device and impact details.",
    sections: [
      section("Issue", [
        field("subject", "Subject", "text", { required: true, placeholder: "Brief description of the issue", full: true }),
        field("location", "Location", "text", { required: true, placeholder: "Classroom or office" }),
        field("problem_description", "Problem description", "textarea", { required: true, placeholder: "Describe what is happening and include any error messages.", full: true })
      ]),
      section("Device information", [
        field("device_type", "Device type", "select", { options: ["Laptop", "Desktop", "Tablet", "Phone", "Other"] }),
        field("serial_number", "Serial number"),
        field("asset_number", "Asset number")
      ], "Complete this section when a device is involved."),
      section("Troubleshooting and impact", [
        field("issue_recurrence", "Issue recurrence", "radio", { required: true, options: recurrenceOptions }),
        field("steps_taken", "Steps already taken", "textarea", { placeholder: "Describe any troubleshooting already attempted.", full: true }),
        field("urgency", "Urgency", "radio", { required: true, options: urgencyOptions }),
        field("additional_comments", "Additional comments", "textarea", { full: true })
      ])
    ]
  },
  {
    id: "expanded-simple",
    group: "General support",
    short: "Expanded Simple",
    title: "Expanded Support Ticket",
    description: "A general service-desk ticket with requester and additional device details.",
    sections: [
      section("Requester and issue", [
        field("subject", "Subject", "text", { required: true, placeholder: "Brief description of the issue", full: true }),
        field("requester_name", "Requester's name", "text", { required: true }),
        field("contact_information", "Contact information", "text", { required: true, placeholder: "Email address or phone number" }),
        field("location", "Location", "text", { required: true, placeholder: "Classroom or office" }),
        field("problem_description", "Problem description", "textarea", { required: true, placeholder: "Describe what is happening and include any error messages.", full: true })
      ]),
      section("Device information", [
        field("device_type", "Device type", "select", { options: ["Laptop", "Desktop", "Tablet", "Phone", "Other"] }),
        field("device_make_model", "Device make and model"),
        field("operating_system", "Operating system"),
        field("serial_number", "Serial number"),
        field("asset_number", "Asset number")
      ], "Complete this section when a device is involved."),
      section("Troubleshooting and impact", [
        field("issue_recurrence", "Issue recurrence", "radio", { required: true, options: recurrenceOptions }),
        field("steps_taken", "Steps already taken", "textarea", { placeholder: "Describe any troubleshooting already attempted.", full: true }),
        field("urgency", "Urgency", "radio", { required: true, options: urgencyOptions }),
        field("additional_comments", "Additional comments", "textarea", { full: true })
      ])
    ]
  },
  {
    id: "detailed",
    group: "General support",
    short: "Detailed",
    title: "Detailed Support Ticket",
    description: "A structured ticket for multi-site environments requiring categorisation and user-impact information.",
    sections: [
      section("Requester and classification", [
        field("subject", "Subject", "text", { required: true, placeholder: "Brief description of the issue", full: true }),
        field("submitted_by", "Submitted by", "text", { required: true }),
        field("contact_email", "Contact email", "email", { required: true }),
        field("contact_phone", "Contact phone", "tel"),
        field("date_submitted", "Date submitted", "date", { required: true, defaultValue: "today" }),
        field("location", "Location", "text", { required: true, placeholder: "Address, building, office or room" }),
        field("category", "Category", "select", { required: true, options: ["Laptop issue", "Charger request", "Form generation", "Wi-Fi", "Other"] })
      ]),
      section("Device information", [
        field("device_type", "Device type", "select", { options: ["Laptop", "Desktop", "Tablet", "Phone", "Other"] }),
        field("device_make_model", "Device make and model"),
        field("operating_system", "Operating system"),
        field("serial_number", "Serial number"),
        field("asset_number", "Asset number")
      ], "Complete this section when a device is involved."),
      section("Issue and impact", [
        field("issue_description", "Issue description", "textarea", { required: true, placeholder: "Describe the issue or support required.", full: true }),
        field("issue_recurrence", "Issue recurrence", "radio", { required: true, options: recurrenceOptions }),
        field("steps_taken", "Steps already taken", "textarea", { full: true }),
        field("user_impact", "User impact", "textarea", { required: true, placeholder: "Explain how work or classroom activity is affected.", full: true }),
        field("urgency", "Urgency", "radio", { required: true, options: urgencyOptions }),
        field("additional_comments", "Additional comments", "textarea", { full: true })
      ])
    ]
  },
  {
    id: "application-service",
    group: "Specialist requests",
    short: "Application, Website or AI",
    title: "Application, Website and AI Service Request",
    description: "For assessing and approving a new application, website, online service or AI capability.",
    sections: [
      section("Requester and request", [
        field("subject", "Subject", "text", { required: true, placeholder: "Request to review service name", full: true }),
        field("requester_name", "Requester's name", "text", { required: true }),
        field("contact_information", "Contact information", "text", { required: true }),
        field("department_location", "Department or location", "text", { required: true }),
        field("required_by", "Required by", "date"),
        field("request_type", "Request type", "radio", { required: true, options: ["Application or software", "Website or online service", "AI service or AI-enabled feature", "Existing service requiring new approval or expanded use"] })
      ]),
      section("Service details", [
        field("service_name", "Product or service name", "text", { required: true }),
        field("vendor", "Vendor or provider"),
        field("website", "Exact website URL", "url", { placeholder: "https://" }),
        field("requested_outcome", "Requested outcome", "select", { required: true, options: ["Approve access", "Purchase", "Deploy", "Integrate", "Expand existing use", "Other"] }),
        field("intended_users", "Intended users", "text", { required: true, placeholder: "Individual, team, staff, students or organisation" }),
        field("estimated_users", "Estimated number of users", "number", { min: 1 }),
        field("purpose_requirements", "Purpose and requirements", "textarea", { required: true, full: true }),
        field("existing_alternatives", "Approved alternatives considered", "textarea", { full: true })
      ]),
      section("Access and deployment", [
        field("access_method", "Access method", "select", { options: ["Browser", "Desktop application", "Mobile application", "Browser extension", "Other"] }),
        field("devices_operating_systems", "Required devices or operating systems"),
        field("account_requirements", "Account requirements", "text", { placeholder: "Individual accounts, shared access or SSO" }),
        field("permissions_integrations", "Required permissions or integrations", "textarea", { full: true })
      ]),
      section("Licensing and approval", [
        field("licence_type", "Licence type", "select", { options: ["Free", "Subscription", "Perpetual", "Unknown"] }),
        field("estimated_cost", "Estimated cost", "text", { placeholder: "Amount and currency" }),
        field("funding_cost_centre", "Funding or cost centre"),
        field("purchasing_approval", "Purchasing approval", "text", { placeholder: "Approver or approval status" })
      ]),
      section("Data, privacy and security", [
        field("information_processed", "Information entered or uploaded", "textarea", { required: true, full: true }),
        field("sensitive_data", "Personal, sensitive or student data involved", "select", { required: true, options: ["No", "Yes — details provided below", "Unknown"] }),
        field("sensitive_data_details", "Sensitive data details", "textarea", { full: true, condition: { field: "sensitive_data", values: ["Yes — details provided below", "Unknown"] } }),
        field("data_storage_location", "Data storage location", "text", { placeholder: "Country, region or unknown" }),
        field("security_privacy_links", "Security, privacy or contract links", "textarea", { full: true })
      ]),
      section("AI-specific information", [
        field("ai_capability", "AI capability and intended use", "textarea", { required: true, full: true, condition: { field: "request_type", values: ["AI service or AI-enabled feature"] } }),
        field("training_use", "Provider uses submitted data for training", "select", { required: true, options: yesNoUnknown, condition: { field: "request_type", values: ["AI service or AI-enabled feature"] } }),
        field("human_review", "Human review before outputs are used", "select", { required: true, options: ["Yes", "No", "Not applicable"], condition: { field: "request_type", values: ["AI service or AI-enabled feature"] } }),
        field("decision_impact", "Outputs affect assessment, employment, wellbeing or other decisions", "select", { required: true, options: ["No", "Yes — explain below", "Unknown"], condition: { field: "request_type", values: ["AI service or AI-enabled feature"] } }),
        field("ai_risk_details", "Decision impact or human-review details", "textarea", { full: true, condition: { field: "request_type", values: ["AI service or AI-enabled feature"] } }),
        field("minimum_age", "Minimum age or consent requirements", "text", { condition: { field: "request_type", values: ["AI service or AI-enabled feature"] } }),
        field("approved_ai_alternatives", "Approved AI alternatives considered", "textarea", { full: true, condition: { field: "request_type", values: ["AI service or AI-enabled feature"] } })
      ], "This section appears only when an AI service or feature is selected."),
      section("Impact and service-owner approval", [
        field("impact_not_approved", "Impact if not approved", "textarea", { required: true, full: true }),
        field("approver_name", "Manager or service owner"),
        field("approval_status", "Approval status", "select", { options: ["Pending", "Approved", "Not required"] })
      ])
    ]
  },
  {
    id: "access-permissions",
    group: "Specialist requests",
    short: "Access and Permissions",
    title: "Access and Permissions Request",
    description: "For adding, changing, removing or temporarily granting access to an existing resource.",
    sections: [
      section("Requester and affected user", [
        field("subject", "Subject", "text", { required: true, placeholder: "Access request for user and resource", full: true }),
        field("requester_name", "Requester's name", "text", { required: true }),
        field("contact_information", "Contact information", "text", { required: true }),
        field("department_location", "Department or location", "text", { required: true }),
        field("request_type", "Request type", "radio", { required: true, options: ["New access", "Change existing access", "Remove access", "Temporary access"] }),
        field("affected_user", "Affected user's full name", "text", { required: true }),
        field("affected_account", "Username or email", "text", { required: true }),
        field("user_role", "Role or position"),
        field("user_manager", "Manager")
      ]),
      section("System and permission", [
        field("system_service", "System, application or service", "text", { required: true }),
        field("resource", "Resource", "text", { required: true, placeholder: "Folder, mailbox, team, site, group or role" }),
        field("current_access", "Current access", "textarea", { full: true }),
        field("requested_access", "Requested access", "textarea", { required: true, full: true }),
        field("reason", "Reason for access", "textarea", { required: true, full: true })
      ]),
      section("Access period and approval", [
        field("start_date", "Start date", "date", { required: true }),
        field("end_review_date", "End or review date", "date"),
        field("elevated_access", "Elevated or administrative access required", "select", { required: true, options: ["No", "Yes — explain below"] }),
        field("elevated_details", "Elevated-access details", "textarea", { full: true, condition: { field: "elevated_access", values: ["Yes — explain below"] } }),
        field("manager_approval", "Manager approval", "text", { placeholder: "Approver and status" }),
        field("owner_approval", "Data, system or resource owner approval", "text", { placeholder: "Approver and status" }),
        field("additional_information", "Additional information", "textarea", { full: true })
      ])
    ]
  },
  {
    id: "security-incident",
    group: "Specialist requests",
    short: "Security or Privacy Incident",
    title: "Cybersecurity and Privacy Incident Report",
    description: "For suspected compromise, phishing, malware, data exposure or another security event.",
    alert: "If the incident is active, spreading, preventing essential work or placing information at immediate risk, contact your urgent security channel now. Do not delay escalation while completing this form.",
    sections: [
      section("Reporter and incident", [
        field("subject", "Subject", "text", { required: true, placeholder: "Security or privacy incident — brief description", full: true }),
        field("reported_by", "Reported by", "text", { required: true }),
        field("contact_information", "Contact information", "text", { required: true }),
        field("location", "Location", "text", { required: true, placeholder: "Site, office or remote" }),
        field("detected_at", "Date and time detected", "datetime-local", { required: true }),
        field("incident_type", "Incident type", "select", { required: true, options: ["Suspicious email, message or phishing", "Suspected account compromise", "Malware or unsafe file", "Lost or stolen device", "Unauthorised access", "Data exposure or incorrect recipient", "Other"] }),
        field("incident_description", "Incident description", "textarea", { required: true, placeholder: "Describe what happened, how it was detected and whether it is still occurring.", full: true })
      ]),
      section("Affected accounts, devices and information", [
        field("affected_accounts", "Affected accounts", "textarea", { full: true }),
        field("device_type", "Device type"),
        field("serial_number", "Serial number"),
        field("asset_number", "Asset number"),
        field("affected_information", "Potentially affected information", "textarea", { placeholder: "Describe the type of information. Do not copy sensitive data into the ticket.", full: true })
      ]),
      section("Indicators and response", [
        field("suspicious_indicator", "Suspicious sender, website or IP address", "textarea", { full: true }),
        field("file_application", "File name or application"),
        field("alert_text", "Relevant error or alert", "textarea", { full: true }),
        field("related_number", "Related ticket or alert number"),
        field("actions_taken", "Actions already taken", "textarea", { required: true, full: true }),
        field("affected_users_services", "Affected users or services", "textarea", { full: true }),
        field("essential_work", "Essential work prevented", "select", { required: true, options: ["No", "Yes"] }),
        field("workaround", "Workaround available", "select", { required: true, options: ["No", "Yes"] })
      ], "Do not delete messages, files or logs that may be required as evidence unless instructed by the security team.")
    ]
  },
  {
    id: "joiner-mover-leaver",
    group: "Specialist requests",
    short: "Joiner, Mover or Leaver",
    title: "Joiner, Mover and Leaver Request",
    description: "For coordinating accounts, access, equipment and ownership changes caused by an employment event.",
    sections: [
      section("Request and person", [
        field("subject", "Subject", "text", { required: true, placeholder: "Joiner, mover or leaver — person's name", full: true }),
        field("requester_name", "Requester's name", "text", { required: true }),
        field("contact_information", "Contact information", "text", { required: true }),
        field("manager", "Manager", "text", { required: true }),
        field("department_location", "Department or location", "text", { required: true }),
        field("request_type", "Request type", "radio", { required: true, options: ["Joiner — new starter", "Mover — role, department or location change", "Leaver — departure or end of engagement"] }),
        field("person_name", "Person's full name", "text", { required: true }),
        field("preferred_name", "Preferred name"),
        field("person_email", "Personal or existing work email", "email"),
        field("engagement_type", "Employment or engagement type", "select", { required: true, options: ["Permanent", "Fixed-term", "Casual", "Contractor", "Volunteer", "Other"] }),
        field("effective_date", "Effective date", "date", { required: true }),
        field("effective_time", "Effective time", "time", { condition: { field: "request_type", values: ["Leaver — departure or end of engagement"] } })
      ]),
      section("Role details", [
        field("current_role", "Current role, department and location", "textarea", { full: true, condition: { field: "request_type", values: ["Mover — role, department or location change", "Leaver — departure or end of engagement"] } }),
        field("new_role", "New role, department and location", "textarea", { full: true, condition: { field: "request_type", values: ["Joiner — new starter", "Mover — role, department or location change"] } }),
        field("new_manager", "Manager after change", "text", { condition: { field: "request_type", values: ["Joiner — new starter", "Mover — role, department or location change"] } })
      ]),
      section("Accounts and access", [
        field("required_systems", "Required systems, applications and groups", "textarea", { full: true, condition: { field: "request_type", values: ["Joiner — new starter", "Mover — role, department or location change"] } }),
        field("shared_resources", "Shared mailboxes, teams, sites or folders", "textarea", { full: true, condition: { field: "request_type", values: ["Joiner — new starter", "Mover — role, department or location change"] } }),
        field("access_remove", "Access to remove", "textarea", { full: true, condition: { field: "request_type", values: ["Mover — role, department or location change", "Leaver — departure or end of engagement"] } }),
        field("temporary_access_end", "Temporary access end date", "date"),
        field("similar_user", "Similar user for role-based access reference")
      ]),
      section("Equipment and ownership", [
        field("equipment_required", "Equipment required", "textarea", { full: true, condition: { field: "request_type", values: ["Joiner — new starter", "Mover — role, department or location change"] } }),
        field("equipment_return", "Equipment to transfer or return", "textarea", { full: true, condition: { field: "request_type", values: ["Mover — role, department or location change", "Leaver — departure or end of engagement"] } }),
        field("asset_serial_numbers", "Existing asset and serial numbers"),
        field("delivery_collection", "Delivery or collection location"),
        field("mailbox_handling", "Mailbox or email handling", "textarea", { full: true, condition: { field: "request_type", values: ["Leaver — departure or end of engagement"] } }),
        field("ownership_transfer", "File, site, team or process ownership to transfer", "textarea", { full: true, condition: { field: "request_type", values: ["Mover — role, department or location change", "Leaver — departure or end of engagement"] } }),
        field("new_owner", "New owner or delegate", "text", { condition: { field: "request_type", values: ["Mover — role, department or location change", "Leaver — departure or end of engagement"] } })
      ]),
      section("Approvals", [
        field("manager_approval", "Manager approval", "text", { required: true, placeholder: "Approver and status" }),
        field("hr_approval", "HR or people-team approval", "text", { placeholder: "Approver and status" }),
        field("system_owner_approval", "Additional system-owner approval", "text"),
        field("additional_instructions", "Additional instructions", "textarea", { full: true })
      ])
    ]
  },
  {
    id: "equipment",
    group: "Specialist requests",
    short: "Equipment",
    title: "Equipment Request",
    description: "For requesting, replacing, borrowing or returning devices, accessories and other equipment.",
    sections: [
      section("Requester and request", [
        field("subject", "Subject", "text", { required: true, placeholder: "Equipment request — item and recipient", full: true }),
        field("requester_name", "Requester's name", "text", { required: true }),
        field("contact_information", "Contact information", "text", { required: true }),
        field("recipient", "Recipient or assigned user", "text", { required: true }),
        field("department_location", "Department or location", "text", { required: true }),
        field("delivery_location", "Delivery or collection location", "text", { required: true }),
        field("request_type", "Request type", "radio", { required: true, options: ["New equipment", "Replacement equipment", "Loan equipment", "Accessory or peripheral", "Equipment return"] })
      ]),
      section("Equipment", [
        field("equipment_type", "Equipment type", "text", { required: true, placeholder: "Laptop, monitor, dock, headset, charger, etc." }),
        field("quantity", "Quantity", "number", { required: true, min: 1, defaultValue: "1" }),
        field("specifications", "Required specifications or compatibility", "textarea", { full: true }),
        field("accessories", "Required accessories", "textarea", { full: true }),
        field("purpose", "Purpose", "textarea", { required: true, full: true })
      ]),
      section("Current equipment", [
        field("current_device", "Current device type", "text", { condition: { field: "request_type", values: ["Replacement equipment", "Equipment return"] } }),
        field("serial_number", "Serial number", "text", { condition: { field: "request_type", values: ["Replacement equipment", "Equipment return"] } }),
        field("asset_number", "Asset number", "text", { condition: { field: "request_type", values: ["Replacement equipment", "Equipment return"] } }),
        field("replacement_reason", "Reason for replacement or return", "textarea", { full: true, condition: { field: "request_type", values: ["Replacement equipment", "Equipment return"] } }),
        field("condition_fault", "Condition or fault", "textarea", { full: true, condition: { field: "request_type", values: ["Replacement equipment", "Equipment return"] } })
      ], "This section appears for replacement and return requests."),
      section("Timing and configuration", [
        field("required_by", "Required by", "date", { required: true }),
        field("loan_start", "Loan start date", "date", { condition: { field: "request_type", values: ["Loan equipment"] } }),
        field("loan_return", "Loan return date", "date", { condition: { field: "request_type", values: ["Loan equipment"] } }),
        field("applications_access", "Required applications or access", "textarea", { full: true }),
        field("special_setup", "Special setup or accessibility requirements", "textarea", { full: true })
      ]),
      section("Purchasing and approval", [
        field("estimated_cost", "Estimated cost or quote"),
        field("funding_cost_centre", "Funding or cost centre"),
        field("budget_owner", "Manager or budget owner"),
        field("approval_status", "Approval status", "select", { options: ["Pending", "Approved", "Not required"] }),
        field("additional_information", "Additional information", "textarea", { full: true })
      ])
    ]
  },
  {
    id: "data-recovery",
    group: "Specialist requests",
    short: "File or Data Recovery",
    title: "File and Data Recovery Request",
    description: "For recovering deleted, overwritten, corrupted or otherwise unavailable files and data.",
    alert: "Avoid creating, renaming or modifying items in the affected location until support confirms it is safe. Further changes may reduce recovery options.",
    sections: [
      section("Requester and recovery type", [
        field("subject", "Subject", "text", { required: true, placeholder: "Recovery request — file, folder or data description", full: true }),
        field("requester_name", "Requester's name", "text", { required: true }),
        field("contact_information", "Contact information", "text", { required: true }),
        field("department_location", "Department or location", "text", { required: true }),
        field("data_owner", "Data owner", "text", { required: true }),
        field("recovery_type", "Recovery type", "radio", { required: true, options: ["Deleted file or folder", "Overwritten or incorrect version", "Corrupted file or data", "Missing or inaccessible data", "Other"] })
      ]),
      section("Original location", [
        field("service_system", "Service or system", "text", { required: true, placeholder: "OneDrive, SharePoint, network drive or application" }),
        field("site_team_drive", "Site, team, mailbox or drive", "text", { required: true }),
        field("original_path", "Original folder or path", "text", { required: true, full: true }),
        field("item_names", "File, folder or record names", "textarea", { required: true, full: true })
      ]),
      section("Timing and description", [
        field("issue_time", "Date and time the issue occurred", "datetime-local", { required: true }),
        field("modification_time", "Approximate deletion or modification time", "datetime-local"),
        field("last_good_version", "Last known good version", "datetime-local"),
        field("last_accessed", "Last successfully accessed", "datetime-local"),
        field("description", "What happened", "textarea", { required: true, full: true }),
        field("actions_taken", "Actions already taken", "textarea", { full: true })
      ]),
      section("Scope, impact and restoration", [
        field("users_affected", "Users affected", "text", { required: true }),
        field("work_affected", "Work or service affected", "textarea", { required: true, full: true }),
        field("required_timeframe", "Required recovery timeframe", "date"),
        field("workaround", "Workaround available", "select", { required: true, options: ["No", "Yes — explain below"] }),
        field("workaround_details", "Workaround details", "textarea", { full: true, condition: { field: "workaround", values: ["Yes — explain below"] } }),
        field("restore_location", "Preferred restore location", "select", { required: true, options: ["Original location", "Alternate location"] }),
        field("alternate_location", "Alternate restore location", "text", { condition: { field: "restore_location", values: ["Alternate location"] } }),
        field("restore_approval", "Permission to restore or overwrite existing data", "text", { placeholder: "Approver and status" }),
        field("additional_information", "Additional information", "textarea", { full: true })
      ])
    ]
  }
];

const templateList = document.querySelector("#template-list");
const templateSelect = document.querySelector("#template-select");
const form = document.querySelector("#ticket-form");
const formFields = document.querySelector("#form-fields");
const formTitle = document.querySelector("#form-title");
const formDescription = document.querySelector("#form-description");
const fieldSummary = document.querySelector("#field-summary");
const templateAlert = document.querySelector("#template-alert");
const attachmentInput = document.querySelector("#attachments");
const attachmentList = document.querySelector("#attachment-list");
const outputPanel = document.querySelector("#output-panel");
const ticketOutput = document.querySelector("#ticket-output");
const recipientEmail = document.querySelector("#recipient-email");
const shareButton = document.querySelector("#share-button");
const attachmentReminder = document.querySelector("#attachment-reminder");
const statusMessage = document.querySelector("#status-message");

let currentTemplate = ticketTemplates[0];
let attachmentObjectUrls = [];
let statusTimer;

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function formatFileSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function getDefaultValue(item) {
  if (item.defaultValue === "today") {
    const now = new Date();
    return new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
  }
  return item.defaultValue || "";
}

function requiredLabel(item) {
  return item.required
    ? '<span class="required-mark" aria-label="required">*</span>'
    : '<span class="optional-mark">Optional</span>';
}

function renderField(item) {
  const classes = ["field"];
  if (item.full || item.type === "textarea" || item.type === "radio") classes.push("full-width");
  if (item.type === "radio") classes.push("choice-field");
  const attributes = [
    `id="${item.id}"`,
    `name="${item.id}"`,
    item.required ? "required" : "",
    item.placeholder ? `placeholder="${escapeHtml(item.placeholder)}"` : "",
    item.min !== undefined ? `min="${item.min}"` : ""
  ].filter(Boolean).join(" ");
  const defaultValue = escapeHtml(getDefaultValue(item));

  let control;
  if (item.type === "textarea") {
    control = `<textarea ${attributes} rows="4">${defaultValue}</textarea>`;
  } else if (item.type === "select") {
    const options = item.options.map(option => `<option value="${escapeHtml(option)}">${escapeHtml(option)}</option>`).join("");
    control = `<select ${attributes}><option value="">Select an option</option>${options}</select>`;
  } else if (item.type === "radio") {
    const choices = item.options.map((option, index) => `
      <label class="choice-option">
        <input type="radio" name="${item.id}" value="${escapeHtml(option)}" ${item.required && index === 0 ? "required" : ""}>
        <span>${escapeHtml(option)}</span>
      </label>`).join("");
    control = `<div class="choice-list" role="radiogroup" aria-labelledby="${item.id}-legend">${choices}</div>`;
    return `<div class="${classes.join(" ")}" data-field-id="${item.id}">
      <span id="${item.id}-legend" class="choice-legend">${escapeHtml(item.label)} ${requiredLabel(item)}</span>
      ${control}
      ${item.help ? `<small>${escapeHtml(item.help)}</small>` : ""}
    </div>`;
  } else {
    control = `<input type="${item.type}" ${attributes} value="${defaultValue}">`;
  }

  return `<div class="${classes.join(" ")}" data-field-id="${item.id}">
    <label for="${item.id}">${escapeHtml(item.label)} ${requiredLabel(item)}</label>
    ${control}
    ${item.help ? `<small>${escapeHtml(item.help)}</small>` : ""}
  </div>`;
}

function renderNavigation() {
  const groups = [...new Set(ticketTemplates.map(template => template.group))];
  templateList.innerHTML = groups.map(group => {
    const buttons = ticketTemplates.filter(template => template.group === group).map((template, index) => {
      const overallIndex = ticketTemplates.indexOf(template) + 1;
      return `<button type="button" class="template-button" data-template-id="${template.id}" aria-current="${template.id === currentTemplate.id}">
        <span class="template-number">${String(overallIndex).padStart(2, "0")}</span>
        <span class="template-copy"><strong>${escapeHtml(template.short)}</strong><small>${escapeHtml(template.description)}</small></span>
      </button>`;
    }).join("");
    return `<p class="template-group-label">${escapeHtml(group)}</p>${buttons}`;
  }).join("");

  templateSelect.innerHTML = groups.map(group => {
    const options = ticketTemplates.filter(template => template.group === group).map(template =>
      `<option value="${template.id}" ${template.id === currentTemplate.id ? "selected" : ""}>${escapeHtml(template.short)}</option>`
    ).join("");
    return `<optgroup label="${escapeHtml(group)}">${options}</optgroup>`;
  }).join("");
}

function getAllFields(template = currentTemplate) {
  return template.sections.flatMap(item => item.fields);
}

function renderForm() {
  formTitle.textContent = currentTemplate.title;
  formDescription.textContent = currentTemplate.description;
  const fields = getAllFields();
  const requiredCount = fields.filter(item => item.required).length;
  fieldSummary.textContent = `${requiredCount} required fields`;

  templateAlert.hidden = !currentTemplate.alert;
  templateAlert.textContent = currentTemplate.alert || "";

  formFields.innerHTML = currentTemplate.sections.map(item => `
    <fieldset class="form-section">
      <legend>${escapeHtml(item.title)}</legend>
      ${item.help ? `<p class="section-help">${escapeHtml(item.help)}</p>` : ""}
      <div class="field-grid">${item.fields.map(renderField).join("")}</div>
    </fieldset>`).join("");

  applyConditions();
}

function getFieldValue(fieldId) {
  const item = getAllFields().find(candidate => candidate.id === fieldId);
  if (!item) return "";
  if (item.type === "radio") {
    return form.querySelector(`input[name="${CSS.escape(fieldId)}"]:checked`)?.value || "";
  }
  return form.elements[fieldId]?.value.trim() || "";
}

function applyConditions() {
  getAllFields().forEach(item => {
    if (!item.condition) return;
    const wrapper = formFields.querySelector(`[data-field-id="${CSS.escape(item.id)}"]`);
    const visible = item.condition.values.includes(getFieldValue(item.condition.field));
    wrapper.hidden = !visible;
    wrapper.querySelectorAll("input, select, textarea").forEach(control => {
      control.disabled = !visible;
    });
  });
  formFields.querySelectorAll(".form-section").forEach(container => {
    const containedFields = [...container.querySelectorAll(".field")];
    container.hidden = containedFields.length > 0 && containedFields.every(item => item.hidden);
  });
  const requiredNames = new Set(
    [...form.querySelectorAll("[required]:not(:disabled)")].map(control => control.name).filter(Boolean)
  );
  fieldSummary.textContent = `${requiredNames.size} required fields`;
}

function selectTemplate(templateId) {
  const nextTemplate = ticketTemplates.find(template => template.id === templateId);
  if (!nextTemplate || nextTemplate.id === currentTemplate.id) return;
  currentTemplate = nextTemplate;
  clearAttachments();
  outputPanel.hidden = true;
  renderNavigation();
  renderForm();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function clearAttachments() {
  attachmentObjectUrls.forEach(url => URL.revokeObjectURL(url));
  attachmentObjectUrls = [];
  attachmentInput.value = "";
  attachmentList.innerHTML = "";
  updateShareAvailability();
}

function renderAttachments() {
  attachmentObjectUrls.forEach(url => URL.revokeObjectURL(url));
  attachmentObjectUrls = [];
  const files = [...attachmentInput.files];
  attachmentList.innerHTML = files.map(file => {
    let preview = '<span class="file-icon" aria-hidden="true">↗</span>';
    if (file.type.startsWith("image/")) {
      const url = URL.createObjectURL(file);
      attachmentObjectUrls.push(url);
      preview = `<img src="${url}" alt="Preview of ${escapeHtml(file.name)}">`;
    }
    return `<div class="attachment-item">${preview}<strong>${escapeHtml(file.name)}</strong><span>${formatFileSize(file.size)}</span></div>`;
  }).join("");
  updateShareAvailability();
}

function updateShareAvailability() {
  shareButton.hidden = typeof navigator.share !== "function";
}

function buildTicket() {
  const subject = getFieldValue("subject") || currentTemplate.title;
  const lines = [`Subject: ${subject}`, "", `Ticket Type: ${currentTemplate.title}`];

  currentTemplate.sections.forEach(item => {
    const responses = item.fields
      .filter(entry => entry.id !== "subject")
      .map(entry => ({ entry, value: getFieldValue(entry.id) }))
      .filter(response => response.value);
    if (!responses.length) return;
    lines.push("", item.title.toUpperCase());
    responses.forEach(({ entry, value }) => {
      if (entry.type === "textarea") {
        lines.push(`${entry.label}:`, value);
      } else {
        lines.push(`${entry.label}: ${value}`);
      }
    });
  });

  const files = [...attachmentInput.files];
  if (files.length) {
    lines.push("", "ATTACHMENTS", ...files.map(file => `- ${file.name}`));
  }
  return { subject, body: lines.join("\n") };
}

function getGeneratedSubject() {
  const firstLine = ticketOutput.value.split("\n", 1)[0].trim();
  if (firstLine.toLowerCase().startsWith("subject:")) {
    return firstLine.slice(firstLine.indexOf(":") + 1).trim() || currentTemplate.title;
  }
  return getFieldValue("subject") || currentTemplate.title;
}

function generateTicket(event) {
  event.preventDefault();
  applyConditions();
  if (!form.checkValidity()) {
    form.reportValidity();
    showStatus("Complete the required fields before generating the ticket.");
    return;
  }
  const ticket = buildTicket();
  ticketOutput.value = ticket.body;
  outputPanel.hidden = false;
  const files = [...attachmentInput.files];
  attachmentReminder.hidden = files.length === 0;
  attachmentReminder.textContent = files.length
    ? `${files.length} file${files.length === 1 ? "" : "s"} selected. Email draft links cannot attach files automatically; attach them manually or use “Share ticket and files” when available.`
    : "";
  outputPanel.scrollIntoView({ behavior: "smooth", block: "start" });
  ticketOutput.focus({ preventScroll: true });
  showStatus("Ticket generated.");
}

async function copyText(value) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(value);
    return;
  }
  ticketOutput.focus();
  ticketOutput.select();
  document.execCommand("copy");
}

async function copyTicket() {
  try {
    await copyText(ticketOutput.value);
    showStatus("Ticket copied to the clipboard.");
  } catch {
    showStatus("The browser could not copy automatically. Select the ticket text and copy it manually.");
  }
}

async function openEmailDraft() {
  const recipient = recipientEmail.value.trim();
  if (recipient && !recipientEmail.checkValidity()) {
    recipientEmail.reportValidity();
    return;
  }
  const subject = getGeneratedSubject();
  const base = `mailto:${recipient}?subject=${encodeURIComponent(subject)}`;
  const fullLink = `${base}&body=${encodeURIComponent(ticketOutput.value)}`;
  const hasFiles = attachmentInput.files.length > 0;

  if (fullLink.length > 1900) {
    try {
      await copyText(ticketOutput.value);
      window.location.href = base;
      showStatus("The ticket was too long for reliable email prefill, so it was copied. Paste it into the opened draft.");
    } catch {
      showStatus("The ticket is too long for reliable email prefill. Copy it manually and paste it into a new email.");
    }
    return;
  }

  window.location.href = fullLink;
  showStatus(hasFiles ? "Email draft opened. Remember to attach the selected files." : "Email draft opened.");
}

async function shareTicket() {
  const files = [...attachmentInput.files];
  const subject = getGeneratedSubject();
  const payload = { title: subject, text: ticketOutput.value };
  let filesIncluded = false;

  if (files.length && navigator.canShare) {
    try {
      if (navigator.canShare({ files })) {
        payload.files = files;
        filesIncluded = true;
      }
    } catch {
      filesIncluded = false;
    }
  }

  try {
    await navigator.share(payload);
    showStatus(files.length && !filesIncluded
      ? "Ticket shared, but this browser could not include the selected files. Attach them manually."
      : "Ticket shared.");
  } catch (error) {
    if (error.name !== "AbortError") {
      showStatus("Sharing was not available. Use Copy ticket or Open email draft instead.");
    }
  }
}

function downloadTicket() {
  const subject = getGeneratedSubject();
  const safeName = subject.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 60) || "support-ticket";
  const blob = new Blob([ticketOutput.value], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${safeName}.txt`;
  link.click();
  URL.revokeObjectURL(url);
  showStatus("Ticket downloaded as a text file.");
}

function resetForm() {
  form.reset();
  clearAttachments();
  outputPanel.hidden = true;
  renderForm();
  showStatus("Form cleared.");
}

function showStatus(message) {
  clearTimeout(statusTimer);
  statusMessage.textContent = message;
  statusMessage.classList.add("visible");
  statusTimer = window.setTimeout(() => statusMessage.classList.remove("visible"), 4500);
}

templateList.addEventListener("click", event => {
  const button = event.target.closest("[data-template-id]");
  if (button) selectTemplate(button.dataset.templateId);
});

templateSelect.addEventListener("change", event => selectTemplate(event.target.value));
formFields.addEventListener("change", applyConditions);
form.addEventListener("submit", generateTicket);
attachmentInput.addEventListener("change", renderAttachments);
document.querySelector("#reset-button").addEventListener("click", resetForm);
document.querySelector("#copy-button").addEventListener("click", copyTicket);
document.querySelector("#email-button").addEventListener("click", openEmailDraft);
document.querySelector("#share-button").addEventListener("click", shareTicket);
document.querySelector("#download-button").addEventListener("click", downloadTicket);

renderNavigation();
renderForm();
updateShareAvailability();
