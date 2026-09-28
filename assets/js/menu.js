const CATEGORIES = [
 {id:'pizzas',name:'Pizzas',short:'Pizzas',image:'pizza.png'},
 {id:'clasicas',name:'Empanadas clásicas',short:'Clásicas',image:'empanadas.png'},
 {id:'especiales',name:'Empanadas especiales',short:'Especiales',image:'empanadas.png'},
 {id:'faina',name:'Fainá',short:'Fainá',image:'faina.png'}
];
const PIZZA_SIZES=['Grande (12)','Mediana (8)','Chica (6)'];
const rawPizzas=[
 ['Muzzarella','Muzzarella, salsa de tomate',20000,17000,15000],
 ['Muzzarella c/Huevo','Muzzarella, salsa de tomate, huevo',23000,20000,18000],
 ['Muzzarella c/Jamón','Muzzarella, salsa de tomate, jamón natural',28000,25000,22000],
 ['Cancha','Salsa de tomate, ajo',11000,9000,8000],
 ['4 Quesos','Muzzarella, salsa de tomate, roquefort, parmesano, provolone',30000,27000,25000],
 ['Fugazza','Cebolla arriba de tu masa',15000,13000,12000],
 ['Fugazzeta','Muzzarella, cebolla',22000,19000,17000],
 ['Fugazzetón','Muzzarella, cebolla, jamón natural, tomate',33000,30000,28000],
 ['Espinaca','Muzzarella, salsa de tomate, cebolla, verdeo',30000,27000,25000],
 ['Especial','Muzzarella, salsa de tomate, jamón natural, morrón',30000,27000,25000],
 ['Napolitana','Muzzarella, salsa de tomate, jamón natural, ajo',28000,23000,21000],
 ['Cantimpalo','Muzzarella, salsa de tomate, cantimpalo',29000,26000,24000],
 ['Roquefort','Muzzarella, roquefort',28000,25000,23000],
 ['Provolone','Muzzarella, salsa de tomate, provolone',34000,30000,28000],
 ['Verdeo','Muzzarella, salsa de tomate, verdeo',27000,24000,22000],
 ['Palmitos','Muzzarella, salsa de tomate, palmitos, salsa golf',37000,33000,31000],
 ['Rúcula c/Jamón Crudo','Muzzarella, salsa de tomate, hojas de rúcula, parmesano',34000,31000,29000],
 ['Rúcula c/Parmesano','Muzzarella, salsa de tomate, hojas de rúcula, parmesano',29000,26000,24000]
];
const rawClasicas=[
 ['Carne Picada','Carne picada, cebolla, morrón, cebolla de verdeo.'],
 ['Pollo','Pollo, cebolla, morrón.'],
 ['4 Quesos','Muzzarella, parmesano, roquefort, provolone.'],
 ['Roquefort c/ Apio','Muzzarella, roquefort, apio.'],
 ['Roquefort c/ Tomate','Muzzarella, roquefort, tomate, aceite de oliva.'],
 ['Cantimpalo','Muzzarella, cantimpalo.'],
 ['Espinaca','Espinaca, salsa blanca, cebolla de verdeo.'],
 ['Humita','Choclo, salsa blanca, cebolla de verdeo.'],
 ['Jamón & Muzza','Muzzarella, jamón natural.'],
 ['Capresse','Muzzarella, tomate, albahaca, aceite de oliva.']
];
const rawEspeciales=[
 ['Carne a cuchillo','Carne cortada a cuchillo, cebolla, morrón, aceite de oliva.'],
 ['Jamón con ananá','Muzzarella, jamón natural, ananá, glaseado a base de mostaza, azúcar y manteca.'],
 ['Bondiola c/ cerveza','Bondiola, zanahoria, puerro, cebolla, morrón, reducción de cerveza negra, provolone.'],
 ['Lomo al champignon','Lomo, crema de champignon, cebolla de verdeo, muzzarella.'],
 ['Matambre al verdeo','Matambre, muzzarella, cebolla de verdeo.'],
 ['Osobuco al malbec','Osobuco, zanahoria, puerro, cebolla de verdeo, morrón, vino malbec.'],
 ['Cheese burger','Carne picada, cheddar, panceta, barbacoa, mostaza.'],
 ['Rúcula, parmesano y crudo','Muzzarella, jamón crudo, rúcula, parmesano.'],
 ['Ciruela y panceta','Muzzarella, panceta, ciruela.']
];
const PRODUCTS=[
 ...rawPizzas.map((p,i)=>({id:'p'+i,category:'pizzas',name:p[0],description:p[1],prices:p.slice(2)})),
 ...rawClasicas.map((p,i)=>({id:'c'+i,category:'clasicas',name:p[0],description:p[1],prices:[2500]})),
 ...rawEspeciales.map((p,i)=>({id:'e'+i,category:'especiales',name:p[0],description:p[1],prices:[2800]})),
 {id:'f0',category:'faina',name:'Fainá Clásica',description:'Porción tradicional.',prices:[2500]},
 {id:'f1',category:'faina',name:'Fainá Verdeo',description:'Con verdeo.',prices:[3000]}
];
