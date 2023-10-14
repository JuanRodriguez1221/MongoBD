use('VentasMotos');

OPERACIONES VISTAS EN CLASE.

    db.Clientes.insertOne(
        { "name": "Juan Manuel Sepulveda Rodriguez", "telephone": "3136795415", "address": "Cr 38 # 99c10", "age": 17, "email": "Juanmase1221@gmail.com", "gender": "Male", "loyalty_points": [51, 5, 100, 200, 300, 10000] }
    );

db.Motos.insertOne(
    { "marca": "Auteco", "modelo": "Pulsar", "cilindraje": 135, "color": ["negro", "azul", "cromado"], "Combustible": "corriente", "placa": "IIX61E", "precio": 17987389 },
);

db.Ventas.insertOne(
    { "nombre_cliente": "Monica Martínez", "teléfono_cliente": "2980399", "dirección_cliente": "calle 92e #66a-49", "edad_cliente": 34, "correo_cliente": "mompa26@gmail.com", "producto_vendido": "Royal Enfield", "cantidad_vendida": 50, "total_venta": 726692642, "fecha_venta": "error: invalid date \"2023-12-31\"", "método_pago": "Transferencia bancaria", "número_transacción": "NT5432" }
);

db.Clientes.find();
db.Motos.find();
db.Ventas.find();

db.Clientes.findOne();
db.Motos.findOne();
db.Ventas.findOne();

db.Clientes.update({ name: 'Juan Manuel Sepulveda Rodriguez' }, { $set: { age: 33 } });

db.Motos.update({ marca: 'Auteco' }, { $set: { modelo: 'pulsar' } });

db.Ventas.update({ nombre_cliente: 'Ambrosius Mattea' }, { $set: { total_venta: 17000000 } });

db.Clientes.updateMany({ gender: 'Male' }, { $set: { balance: 'Real' } });

db.Motos.updateMany({ marca: 'AKT' }, { $set: { modelo: '125 NKD' } });

db.Ventas.updateMany({ producto_vendido: 'Motos Honda' }, { $set: { cantidad_vendida: 100 } });

db.Clientes.deleteOne({ name: 'Bertie Abramzon' });

db.Motos.deleteOne({ placa: '345MNO' });

db.Ventas.deleteOne({ número_transacción: 'NT3210' });

db.Clientes.deleteMany({ name: 'Kimmie Cuseick', name: 'Will Melior' });

db.Motos.deleteMany({ marca: 'Hero' });

db.Ventas.deleteMany({ edad_cliente: { $gte: 90, $lte: 100 } })

db.ColeccionPrueba.drop();

use('BDPrueba');

db.dropDatabase();

OPERADORES DE CONSULTA

db.Ventas.find({ método_pago: 'Efectivo', producto_vendido: 'Royal Enfield', total_venta: { $gte: 700000000 } })

db.Clientes.find({ gender: 'Female', membership: 'Platinum', age: { $gte: 60, $lte: 70 } })

db.Motos.find({ precio: { $gte: 7679310, $lte: 8943933 } });

db.Clientes.find({ age: { $lt: 46 } });

db.Motos.find({ cilindraje: { $lt: 292 } });

db.Ventas.find({ cantidad_vendida: { $lt: 30 } });


db.Clientes.find({ age: { $gt: 70 } });

db.Motos.find({ cilindraje: { $gt: 335 } });

db.Ventas.find({ cantidad_vendida: { $gt: 82 } });

db.Clientes.find({ age: { $eq: 91 } });

db.Motos.find({ cilindraje: { $eq: 696 } });

db.Ventas.find({ cantidad_vendida: { $eq: 45 } });

db.Clientes.find({ balance: { $ne: 'Rand' } });

db.Motos.find({ Combustible: { $ne: 'extra' } });

db.Ventas.find({ producto_vendido: { $ne: 'Auteco' } });

db.Clientes.find({ membership: { $in: ['Platinum'] } });

db.Motos.find({ precio: { $in: [17987389] } });

db.Ventas.find({ método_pago: { $in: ['Tarjeta de crédito'] } });

db.Clientes.find({ gender: { $nin: ['Female'] } });

db.Motos.find({ marca: { $nin: ['TVS'] } });

db.Ventas.find({ método_pago: { $nin: ['Transferencia bancaria'] } });

db.Clientes.find({ $and: [{ age: 46 }, { balance: 'Rand' }] });

db.Motos.find({ $and: [{ modelo: 'pulsar' }, { cilindraje: 292 }] });

db.Ventas.find({ $and: [{ edad_cliente: 77 }, { producto_vendido: 'AKT' }] });

db.Clientes.find({ $or: [{ gender: 'Female' }, { gender: 'Male' }] });

db.Motos.find({ $or: [{ marca: 'Auteco' }, { marca: 'TVS' }] });

db.Ventas.find({ $or: [{ nombre_cliente: 'Ambrosius Mattea' }, { nombre_cliente: 'Eadie Chiechio' }] });

db.Clientes.find({ name: { $not: { $eq: 'Eadie' } } })

db.Motos.find({ marca: { $not: { $eq: 'TVS' } } })

db.Ventas.find({ método_pago: { $not: { $eq: 'Efectivo' } } })

db.Clientes.createIndex({ name: 'text' });
db.Clientes.find({ $text: { $search: 'Juan' } });

db.Motos.createIndex({ marca: 'text' });
db.Motos.find({ $text: { $search: 'Auteco' } });

db.Ventas.createIndex({ producto_vendido: 'text' });
db.Ventas.find({ $text: { $search: 'Auteco' } });

db.Clientes.find({ name: { $regex: /Len/ } });

db.Motos.find({ placa: { $regex: /LM/ } });

db.Ventas.find({ nombre_cliente: { $regex: /Amb/ } });

db.Clientes.find({
    $where: function () {
        return (hex_md5(this.name) == 'ba03863c7c588a8dcc0e222e1297d378')
    }
});

db.Motos.find({
    $where: function () {
        return (hex_md5(this.placa) == '177f12f37685d5e371589ab618bea7b6')
    }
});

db.Ventas.find({
    $where: function () {
        return (hex_md5(this.número_transacción) == '96d630f72c103bea464fe373a951dc1b')
    }
});

db.Clientes.find({ name: { $exists: true } });

db.Motos.find({ placa: { $exists: true } });

db.Ventas.find({ método_pago: { $exists: true } });

db.Clientes.find({ 'name': { $type: 'string' } });

db.Motos.find({ 'placa': { $type: 'string' } });

db.Ventas.find({ 'total_venta': { $type: 'int' } });

db.Clientes.find({ loyalty_points: { $all: [{ $elemMatch: { $gt: 30 } }] } })

db.Clientes.find({ loyalty_points: { $all: [{ $elemMatch: { $gte: 30, $lte: 100 } }] } });

db.Motos.find({ color: { $all: ['naranja'] } });

db.Clientes.find({ loyalty_points: { $size: 2 } });

db.Clientes.find({ loyalty_points: { $size: 4 } });

db.Motos.find({ color: { $size: 3 } });

db.Clientes.find({}, { loyalty_points: { $slice: 1 } });

db.Clientes.find({}, { loyalty_points: { $slice: 4 } });

db.Motos.find({}, { color: { $slice: 8 } });







