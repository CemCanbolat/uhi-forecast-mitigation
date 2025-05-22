class DataNotFoundError(Exception):
    """Raised when no data is found for the requested city."""
    pass

class InvalidCityError(Exception):
    """Raised when the provided city name is invalid or not supported."""
    pass

class DataFormatError(Exception):
    """Raised when the data format is invalid or cannot be parsed."""
    pass

class StorageConnectionError(Exception):
    """Raised when there is a problem connecting to the storage backend."""
    pass