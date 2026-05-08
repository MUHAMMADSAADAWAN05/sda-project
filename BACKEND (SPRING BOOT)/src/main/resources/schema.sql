IF DB_ID('FoodOrderingDB') IS NULL
BEGIN
    CREATE DATABASE FoodOrderingDB;
END;
GO

USE FoodOrderingDB;
GO

IF OBJECT_ID('dbo.order_items', 'U') IS NOT NULL DROP TABLE dbo.order_items;
IF OBJECT_ID('dbo.orders', 'U') IS NOT NULL DROP TABLE dbo.orders;
IF OBJECT_ID('dbo.menu_items', 'U') IS NOT NULL DROP TABLE dbo.menu_items;
IF OBJECT_ID('dbo.restaurants', 'U') IS NOT NULL DROP TABLE dbo.restaurants;
IF OBJECT_ID('dbo.users', 'U') IS NOT NULL DROP TABLE dbo.users;
GO

CREATE TABLE users (
    id INT IDENTITY(1,1) PRIMARY KEY,
    name NVARCHAR(120) NOT NULL,
    email NVARCHAR(120) NOT NULL UNIQUE,
    password_hash NVARCHAR(255) NOT NULL,
    role NVARCHAR(20) NOT NULL CHECK (role IN ('CUSTOMER', 'ADMIN', 'DRIVER', 'RESTAURANT'))
);

CREATE TABLE drivers (
    id INT IDENTITY(1,1) PRIMARY KEY,
    user_id INT NOT NULL UNIQUE FOREIGN KEY REFERENCES users(id),
    vehicle_type NVARCHAR(50),
    vehicle_number NVARCHAR(50),
    is_available BIT DEFAULT 1,
    current_location NVARCHAR(255)
);


CREATE TABLE restaurants (
    id INT IDENTITY(1,1) PRIMARY KEY,
    name NVARCHAR(120) NOT NULL,
    location NVARCHAR(120) NOT NULL,
    cuisine NVARCHAR(80) NOT NULL,
    rating DECIMAL(2,1) NOT NULL,
    delivery_time NVARCHAR(30) NOT NULL
);

CREATE TABLE menu_items (
    id INT IDENTITY(1,1) PRIMARY KEY,
    restaurant_id INT NOT NULL FOREIGN KEY REFERENCES restaurants(id),
    category NVARCHAR(80) NOT NULL,
    name NVARCHAR(120) NOT NULL,
    description NVARCHAR(250) NULL,
    image_url NVARCHAR(500) NULL,
    price DECIMAL(10,2) NOT NULL,
    is_available BIT NOT NULL DEFAULT 1
);

CREATE TABLE orders (
    id INT IDENTITY(1,1) PRIMARY KEY,
    user_id INT NOT NULL FOREIGN KEY REFERENCES users(id),
    delivery_address NVARCHAR(250) NOT NULL,
    payment_method NVARCHAR(50) NOT NULL,
    status NVARCHAR(20) NOT NULL CHECK (status IN ('PLACED', 'PREPARING', 'DELIVERED')),
    total_amount DECIMAL(10,2) NOT NULL,
    created_at DATETIME2 NOT NULL DEFAULT SYSDATETIME()
);

CREATE TABLE order_items (
    id INT IDENTITY(1,1) PRIMARY KEY,
    order_id INT NOT NULL FOREIGN KEY REFERENCES orders(id),
    menu_item_id INT NOT NULL FOREIGN KEY REFERENCES menu_items(id),
    quantity INT NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL
);
GO

INSERT INTO users (name, email, password_hash, role) VALUES
('Admin User', 'admin@foodapp.com', 'password', 'ADMIN'),
('Ayesha Khan', 'ayesha@foodapp.com', 'password', 'CUSTOMER'),
('Ali Raza', 'ali@foodapp.com', 'password', 'CUSTOMER');

INSERT INTO restaurants (name, location, cuisine, rating, delivery_time) VALUES
('Burger Junction', 'Gulshan, Karachi', 'Fast Food', 4.5, '25-35 min'),
('Spice House', 'Clifton, Karachi', 'Desi', 4.2, '30-40 min'),
('Fresh Bowl', 'Bahadurabad, Karachi', 'Healthy', 4.7, '20-30 min'),
('BBQ Corner', 'North Nazimabad, Karachi', 'BBQ', 4.4, '30-45 min'),
('Drink Hub', 'PECHS, Karachi', 'Drinks', 4.1, '15-25 min');

INSERT INTO menu_items (restaurant_id, category, name, description, image_url, price, is_available) VALUES
(1, 'Burgers', 'Classic Beef Burger', 'Juicy grilled beef patty with cheese', 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=80', 8.99, 1),
(1, 'Burgers', 'Chicken Zinger Burger', 'Crispy chicken fillet with spicy mayo', 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=900&q=80', 7.49, 1),
(1, 'Drinks', 'Cold Drink', '330ml canned drink', 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=900&q=80', 1.99, 1),
(2, 'Desi', 'Chicken Biryani', 'Aromatic rice with spicy chicken', 'https://images.unsplash.com/photo-1701579231349-d7459c40919d?auto=format&fit=crop&w=900&q=80', 6.99, 1),
(2, 'Desi', 'Karahi Chicken', 'Traditional karahi with rich gravy', 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=900&q=80', 10.99, 1),
(3, 'Healthy', 'Grilled Chicken Bowl', 'Protein bowl with veggies', 'https://images.unsplash.com/photo-1546793665-c74683f339c1?auto=format&fit=crop&w=900&q=80', 9.49, 1),
(3, 'Healthy', 'Avocado Salad', 'Mixed greens with avocado', 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80', 7.99, 1),
(4, 'BBQ', 'Chicken Tikka', 'Smoky charcoal grilled chicken tikka', 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=900&q=80', 8.49, 1),
(4, 'BBQ', 'Seekh Kebab Platter', 'Tender kebabs with naan and chutney', 'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?auto=format&fit=crop&w=900&q=80', 11.49, 1),
(5, 'Drinks', 'Mango Smoothie', 'Fresh mango blend with yogurt', 'https://images.unsplash.com/photo-1497534446932-c925b458314e?auto=format&fit=crop&w=900&q=80', 3.49, 1),
(5, 'Drinks', 'Iced Latte', 'Cold coffee with milk foam', 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=900&q=80', 3.99, 1);

INSERT INTO orders (user_id, delivery_address, payment_method, status, total_amount, created_at) VALUES
(2, 'Gulshan Block 7, Karachi', 'Cash on Delivery', 'PLACED', 17.47, DATEADD(MINUTE, -45, SYSDATETIME())),
(3, 'Clifton Block 5, Karachi', 'Cash on Delivery', 'PREPARING', 13.98, DATEADD(MINUTE, -25, SYSDATETIME())),
(2, 'Bahadurabad, Karachi', 'Cash on Delivery', 'DELIVERED', 9.99, DATEADD(HOUR, -3, SYSDATETIME()));

INSERT INTO order_items (order_id, menu_item_id, quantity, unit_price) VALUES
(1, 1, 1, 8.99),
(1, 3, 2, 1.99),
(1, 11, 1, 3.49),
(2, 4, 2, 6.99),
(3, 7, 1, 7.99),
(3, 3, 1, 1.99);
GO
