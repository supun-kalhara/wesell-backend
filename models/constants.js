const Role = {
    ADMIN: "admin",
    SUPERUSER: "super",
    BASIC: "basic"
}

const PostType = {
    PRODUCT: "product",
    SERVICE: "service",
    JOB: "job",
    HOUSING: "housing"
}

const Condition = {
    BRAND_NEW: "brandNew",
    LIKE_NEW: "likeNew",
    EXCELLENT: "excellent",
    GOOD: "good",
    OK: "okay",
    OLD: "old"
}

const ReportType = {
    FRAUD: "fraud",
    SPAM: "spam",
    FALSE_ADVERTISING: "falseAdvertising",
    OFFENSIVE: "offensive"
}

module.exports = {
    Role,
    PostType,
    Condition,
    ReportType,
}