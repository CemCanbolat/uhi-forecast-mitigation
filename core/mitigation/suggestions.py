from .mitigation_config import MITIGATION

def generate_mitigation_suggestions(values):
    """
    Generate mitigation suggestions based on environmental indicators.
    Args:
        values (dict): Dictionary containing environmental indicators.
        Returns:
        list: List of dictionaries with mitigation suggestions.
    """
    suggestions = []

    if values["LST"] > MITIGATION["LST_THRESHOLD"]:
        suggestions.append({
            "icon": "🌡️",
            "action": "Urban tree planting",
            "impact": "Reduces surface temperature by 2-4°C"
        })

    if values["NDVI"] < MITIGATION["NDVI_THRESHOLD"]:
        suggestions.append({
            "icon": "🌿",
            "action": "Install green roofs and walls",
            "impact": "Improves vegetation index and thermal comfort"
        })

    if values["NDBI"] >  MITIGATION["NDBI_THRESHOLD"]:
        suggestions.append({
            "icon": "🏙️",
            "action": "Use reflective surfaces on buildings",
            "impact": "Reduces heat storage on concrete structures"
        })

    if values["Albedo"] <  MITIGATION["ALBEDO_THRESHOLD"]:
        suggestions.append({
            "icon": "🪞",
            "action": "Install high-reflectance materials",
            "impact": "Increases surface reflectance and reduces heat absorption"
        })

    return suggestions if suggestions else [{
        "icon": "✅",
        "action": "No intervention needed",
        "impact": "Environmental indicators are within safe ranges"
    }]

def get_mitigation_suggestions(uhi_zones):
    for uhi in uhi_zones:
        uhi["mitigation_suggestions"] = generate_mitigation_suggestions(uhi["mitigation_values"])
    return uhi_zones