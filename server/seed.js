require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Brand = require('./models/Brand');
const CarModel = require('./models/CarModel');
const ModelDetail = require('./models/ModelDetail');
const User = require('./models/User');

const MONGO_URI =
  'mongodb+srv://prizviseima35_db_user:C1givOUtwQ8r9UEz@cluster0.falwcgt.mongodb.net/?appName=Cluster0';

const data = {
  brands: [
    {
      _id: 'audi',
      name: 'Audi',
      country: 'Germany',
      logoUrl: '/logos/audi.png',
    },
    { _id: 'bmw', name: 'BMW', country: 'Germany', logoUrl: '/logos/bmw.png' },
    {
      _id: 'ferrari',
      name: 'Ferrari',
      country: 'Italy',
      logoUrl: '/logos/ferrari.png',
    },
    {
      _id: 'porsche',
      name: 'Porsche',
      country: 'Germany',
      logoUrl: '/logos/porsche.png',
    },
    {
      _id: 'mercedes',
      name: 'Mercedes',
      country: 'Germany',
      logoUrl: '/logos/mercedes.png',
    },
    { _id: 'ford', name: 'Ford', country: 'USA', logoUrl: '/logos/ford.png' },
    {
      _id: 'mazda',
      name: 'Mazda',
      country: 'Japan',
      logoUrl: '/logos/mazda.png',
    },
    {
      _id: 'pagani',
      name: 'Pagani',
      country: 'Italy',
      logoUrl: '/logos/pagani.png',
    },
  ],
  models: [
    { _id: 'a3', brandId: 'audi', modelName: 'A3', year: '2023' },
    { _id: 'a4', brandId: 'audi', modelName: 'A4', year: '2023' },
    { _id: 'a5', brandId: 'audi', modelName: 'A5', year: '2022' },
    { _id: 'a6', brandId: 'audi', modelName: 'A6', year: '2021' },
    { _id: 'a7', brandId: 'audi', modelName: 'A7', year: '2022' },
    { _id: 'a8', brandId: 'audi', modelName: 'A8', year: '2023' },
    { _id: 'q3', brandId: 'audi', modelName: 'Q3', year: '2023' },
    { _id: 'q5', brandId: 'audi', modelName: 'Q5', year: '2024' },
    { _id: 'q7', brandId: 'audi', modelName: 'Q7', year: '2022' },
    { _id: 'q8', brandId: 'audi', modelName: 'Q8', year: '2023' },
    { _id: 'r8', brandId: 'audi', modelName: 'R8', year: '2023' },
    { _id: 'tt', brandId: 'audi', modelName: 'TT', year: '2021' },
    { _id: 'e-tron', brandId: 'audi', modelName: 'e-tron GT', year: '2024' },
    { _id: 'm3', brandId: 'bmw', modelName: 'M3', year: '2023' },
    { _id: 'm5', brandId: 'bmw', modelName: 'M5', year: '2022' },
    { _id: 'i8', brandId: 'bmw', modelName: 'i8', year: '2020' },
    { _id: 'x5', brandId: 'bmw', modelName: 'X5', year: '2023' },
    { _id: 'x6', brandId: 'bmw', modelName: 'X6', year: '2024' },
    { _id: 'i7', brandId: 'bmw', modelName: 'i7', year: '2023' },
    { _id: 'f8', brandId: 'ferrari', modelName: 'F8 Tributo', year: '2022' },
    {
      _id: 'sf90',
      brandId: 'ferrari',
      modelName: 'SF90 Stradale',
      year: '2023',
    },
    { _id: 'roma', brandId: 'ferrari', modelName: 'Roma', year: '2021' },
    { _id: '296_gtb', brandId: 'ferrari', modelName: '296 GTB', year: '2023' },
    { _id: '911', brandId: 'porsche', modelName: '911 Carrera', year: '2023' },
    { _id: 'taycan', brandId: 'porsche', modelName: 'Taycan', year: '2024' },
    { _id: 'cayenne', brandId: 'porsche', modelName: 'Cayenne', year: '2022' },
    {
      _id: 'panamera',
      brandId: 'porsche',
      modelName: 'Panamera',
      year: '2021',
    },
    { _id: 'c-class', brandId: 'mercedes', modelName: 'C-Class', year: '2023' },
    { _id: 'e-class', brandId: 'mercedes', modelName: 'E-Class', year: '2024' },
    { _id: 's-class', brandId: 'mercedes', modelName: 'S-Class', year: '2022' },
    { _id: 'g-class', brandId: 'mercedes', modelName: 'G-Class', year: '2023' },
    { _id: 'mustang', brandId: 'ford', modelName: 'Mustang', year: '2024' },
    { _id: 'bronco', brandId: 'ford', modelName: 'Bronco', year: '2023' },
    { _id: 'f-150', brandId: 'ford', modelName: 'F-150', year: '2022' },
    { _id: 'gt', brandId: 'ford', modelName: 'GT', year: '2021' },
    { _id: 'mx-5', brandId: 'mazda', modelName: 'MX-5 Miata', year: '2023' },
    { _id: 'cx-5', brandId: 'mazda', modelName: 'CX-5', year: '2024' },
    { _id: 'mazda3', brandId: 'mazda', modelName: 'Mazda3', year: '2022' },
    { _id: 'huayra', brandId: 'pagani', modelName: 'Huayra', year: '2021' },
    { _id: 'zonda', brandId: 'pagani', modelName: 'Zonda R', year: '2020' },
  ],
  modelDetails: [
    {
      _id: 'a4',
      brandId: 'audi',
      modelName: 'A4',
      year: '2023',
      description:
        'Audi A4 – це популярний середньорозмірний седан, який є ідеальним вибором для тих, хто цінує комфорт, продуктивність. Модель має витончений дизайн, потужні двигуни та передові технології.',
      imageUrl: '/images/audi-a4.jpg',
      facts: [
        "Об'єм двигуна: від 1.4 до 3.0 літра",
        'Потужність: від 150 до 347 к.с.',
      ],
    },
    {
      _id: '911',
      brandId: 'porsche',
      modelName: '911 Carrera',
      year: '2023',
      description: 'Porsche 911 – це ікона спортивних автомобілів...',
      imageUrl: '/images/porsche-911.jpg',
      facts: [
        'Двигун: 3.0-літровий 6-циліндровий твін-турбо',
        'Привід: Задній або повний',
      ],
    },
    {
      _id: 'mustang',
      brandId: 'ford',
      modelName: 'Mustang',
      year: '2024',
      description:
        'Нове покоління Ford Mustang зберігає класичний дух muscle car...',
      imageUrl: '/images/ford-mustang.jpg',
      facts: ['Двигуни: 2.3L EcoBoost або 5.0L V8', 'Remote Rev'],
    },
  ],
};

const seedDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB for seeding...');

    await Brand.deleteMany({});
    await CarModel.deleteMany({});
    await ModelDetail.deleteMany({});
    await User.deleteMany({});

    await Brand.insertMany(data.brands);
    await CarModel.insertMany(data.models);
    await ModelDetail.insertMany(data.modelDetails);

    const hashedPassword = await bcrypt.hash('password', 10);
    await User.create({
      email: 'test@test.com',
      password: hashedPassword,
      name: 'Admin User',
    });

    console.log('Database seeded successfully with hashed users! 🌱');
    process.exit(0);
  } catch (err) {
    console.error('Error seeding database:', err);
    process.exit(1);
  }
};

seedDB();
