from sqlalchemy import Column, Integer, String, Date, ForeignKey
from sqlalchemy.orm import relationship
from database import Base

class Product(Base):
    __tablename__ = "products"
    id = Column(Integer, primary_key=True, index=True)
    supplier_name = Column(String, index=True)
    product_info = Column(String)
    category_id = Column(Integer, ForeignKey("categories.id"))
    quantity = Column(Integer)
    timeline = Column(Date)
    location_id = Column(Integer, ForeignKey("locations.id"))
    required_for = Column(String)

class Category(Base):
    __tablename__ = "categories"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)

class Location(Base):
    __tablename__ = "locations"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
