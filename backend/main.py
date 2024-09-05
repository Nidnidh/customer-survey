from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from database import SessionLocal, engine, Base
from models import Product, Location, Category
from schemas import ProductCreate

app = FastAPI()

Base.metadata.create_all(bind=engine)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("http://localhost:3000/api/new-item")
async def read_categories(db: Session = Depends(get_db)):
    return db.query(Category).all()

@app.get("http://localhost:3000/api/locations")
async def read_locations(db: Session = Depends(get_db)):
    return db.query(Location).all()

@app.post("http://localhost:3000/api/new-item")
async def create_item(product: ProductCreate, db: Session = Depends(get_db)):
    new_product = Product(**product.dict())
    db.add(new_product)
    db.commit()
    db.refresh(new_product)
    return new_product
