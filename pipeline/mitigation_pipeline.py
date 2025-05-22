from core.mitigation import *

def mitigation_pipeline(start_date, end_date, uhi_list):
    """
    Runs the full mitigation workflow:
    - Extracts mean environmental values per UHI zone
    - Applies mitigation suggestions based on thresholds
    - Serializes geometries for export

    Args:
        start_date (str): Analysis start date
        end_date (str): Analysis end date
        uhi_list (list): List of UHI geometries with metadata

    Returns:
        list: Mitigated and serialized UHI zone outputs
    """
    
    if not uhi_list:
        return uhi_list

    print("Mean values Extracting..\n")

    uhi_with_values = extract_values_for_uhis(uhi_list, start_date, end_date)

    print("Mitigating UHI Zones..\n")
    uhi_with_suggestions = get_mitigation_suggestions(uhi_with_values)

    uhi_serialized = serialize_geometries(uhi_with_suggestions)

    return uhi_serialized