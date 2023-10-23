use('VentasMotos')

//CRUD - Sub-documentos 3 operaciones por operacion del crud 
//1 Indice simple- Indices compuestos 
//Agregaciones 1 operador por coleccion 




// COLECCION CLIENTES 

// Imprimir Todos los clientes.
db.Clientes.find()

// Imprimir un cliente en especifico pero que tenga un hijo registrado con un nombre.
db.Clientes.find({// 
 "nombre": "Salmon Twittey",
 "hijos.nombre": "Isabella"
})

// Update
db.Clientes.updateOne(
  { "nombre": "Elisabet Haley", "hijos.nombre": "Lucas" },
  { $set: { "hijos.$.edad": 18 } })
db.Clientes.find({ "nombre": "Elisabet Haley" })

// Remove 
db.Clientes.remove({ 'nombre': 'Grantham Bosley', 'hijos.nombre': 'James' })
db.Clientes.find({ "nombre": "Grantham Bosley" })


// Indice simple
db.Clientes.createIndex({ "nombre_cliente": 1 })

// Indice compuesto
db.Clientes.createIndex({ "nombre_cliente": 2, "name:": 2})

// AGREGACIONES
db.Clientes.aggregate([
   {$match :{puntos_de_loyalty: 557}}
])

db.Clientes.aggregate([
   {$project: { _id: 0, name: 1, telephone: 1, age: 1, balance: 1 }}
])

db.Clientes.aggregate([
 { $group: { _id: '$name', totaldocs: { $sum: 1 } } }
])

db.Clientes.aggregate([
   {$group:{_id:'$balance', totaldocs:{$sum:1}}},
   {$out: 'aggResults'}
])
db.aggResults.find()

db.Clientes.aggregate([
 { $match: { name: 'Sibel Curds' } },
 { $unwind: '$loyalty_points' }
])

db.Clientes.find().sort({ "_id": 1 })

db.Clientes.aggregate([
 { $unwind: '$loyalty_points' },
 { $sort: { 'loyalty_points': 1 } },
 { $limit: 2 }
])


db.Clientes.aggregate([
 { $match: { name: 'Sibel Curds' } },
 { $addFields: { age: 99 } }
])


db.Clientes.updateMany(
 { name: 'Sibel Curds' },
 { $set: { age: 99 } }
)


db.Clientes.aggregate([
  { $unwind: '$loyalty_points' },
  {$count: 'total_documentos'}
])


db.Clientes.aggregate([
 { $match: { name: 'Lena Pittaway' } },
 {
     $lookup: {
         from: 'Clientes',
         localField: 'loyalty_points',
         foreignField: 'name',
         as: 'loyalty_points'
     }
 }
])


db.Clientes.aggregate([
 { $sortByCount: '$level' }
])





// COLECCION MOTOS
// Imprimir todas las motos.
db.Motos.find()

// Imprimir una moto
db.Motos.find({
 "modelo": "Zero SR/F",
 "color.nombre": "naranja"
})

//Update
db.Motos.updateOne(
 { "modelo": "Zero SR/F", "color.nombre": "naranja" },
 { $set: { "color.nombre": "Blue" } }
)
db.Motos.find({ "modelo": "Zero SR/F" })

// Remome
db.Motos.remove({ 'marca': 'Benelli TNT 600i', 'color.nombre': 'gray' })
db.Motos.find({ "marca": "Benelli TNT 600i" })

// Indice simple
db.Motos.createIndex({ "marca_moto": 1 })

// Indice compuesto
db.Motos.createIndex({ "marca_moto": 2, "modelo": 2})

// AGREGACIONES
db.Motos.aggregate([
  {$match: {Combustible: 'extra'}}
])

db.Motos.aggregate([
   {$project:{_id: 0, marca: 1, placa:1, cilindraje:1}}
])

db.Motos.aggregate([
  {$group:{_id:'$marca', totaldocs:{$sum:1}}}
])

db.Motos.aggregate([
 { $group: { _id: '$cilindraje', totaldocs: { $sum: 1 } } },
 { $out: 'aggResults' }
])
db.aggResults.find()

db.Motos.aggregate([
{ $match: { placa: 'LMN456' } },
{ $unwind: '$color' }
])

db.Motos.aggregate([
   { $unwind: '$color' },
   { $project: { _id: 0, marca: 1, placa: 1, cilindraje: 1 } },
   { $sort: { 'color': 1 } },
   { $limit: 5 }
])

db.Motos.aggregate([
  { $match: { placa: 'LMN456' } },
  { $addFields: { marca: 'Yamaha' } }
])

db.Clientes.updateMany(
  { placa: 'LMN456' },
  { $set: { marca: 'Yamaha' } }
)

db.Motos.aggregate([
   { $unwind: '$color' },
   {$count: 'total_documentos'}
])

db.Motos.aggregate([
   { $match: { placa: 'LMN456' } },
   {$lookup: {from: 'Motos', localField: 'color', foreignField: 'name', as: 'color_info' }}
])
  
db.Motos.aggregate([
  {$sortByCount: '$level'}
])





//COLECCION VENTAS

// Imprimir todas las ventas.
db.Ventas.find()

// Imprimir una venta
db.Ventas.find({
  "nombre_cliente": "Ailina Ravel",
  "productos_vendidos.nombre_producto": "Tie"
})

// Update
db.Ventas.updateOne(
  { "nombre_cliente": "Yoshiko Fust", "productos_vendidos.nombre_producto": "Hat" },
  { $set: { "productos_vendidos.$.cilindraje": 990 } }
)

db.Ventas.find({ "nombre_cliente": "Yoshiko Fust" })

// Remome
db.Ventas.remove({ 'nombre_cliente': 'Myranda Tregunna', 'productos_vendidos.nombre_producto': 'Skirt' })
db.Ventas.find({ "nombre_cliente": "Myranda Tregunna" })

// Indice simple
db.Ventas.createIndex({ "ventas_moto_cliente": 1 })

//Indice compuesto
db.Ventas.createIndex({ "ventas_moto_cliente": 2, "producto_vendido": 2})

//AGREGAIONES

db.Ventas.aggregate([
   {$match:{total_venta: 17000000}}
])

db.Ventas.aggregate([
   {$project:{_id:0, direccion_cliente: 1, cantidad_vendida: 1, método_pago:1}}
])

db.Ventas.aggregate([
   {$group:{_id:'$edad_cliente', totaldocs:{$sum:1}}}
])

db.Ventas.aggregate([
   { $group: { _id: '$edad_cliente', totaldocs: { $sum: 1 } } },
   { $out: 'aggResults' }
])

db.aggResults.find()

db.Ventas.aggregate([
   { $unwind: '$método_pago' },
   { $project: { _id: 0, nombre_cliente: 1, método_pago: 1 } },
   { $sort: { 'método_pago': 1 } },
   { $limit: 5 }
])

db.Motos.aggregate([
 { $match: {teléfono_cliente: '183-775-6228' } },
 { $addFields: { edad_cliente: 74 } }
])

db.Clientes.updateMany(
   { teléfono_cliente: '183-775-6228' },
   { $set: { edad_cliente: 99 } }
 )

db.Ventas.aggregate([
   { $unwind: '$método_pago' },
   {$count: 'total_documentos'}
])

db.Ventas.aggregate([
 {
   $lookup: {
     from: "Clientes", 
     localField: "teléfono_cliente", 
     foreignField: "teléfono_cliente", 
     as: "ventas_con_cliente"
   }
 }
])

  
db.Ventas.aggregate([
   {$sortByCount: '$level'}
])