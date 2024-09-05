from pydantic import BaseModel

class ProductCreate(BaseModel):
    supplier_name: str
    product_info: str
    category_id: int
    quantity: int
    timeline: str  
    location_id: int
    required_for: str
