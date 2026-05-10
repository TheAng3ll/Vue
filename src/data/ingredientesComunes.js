/**
 * Lista amplia de ingredientes comunes (ES) para autocomplete del generador.
 * Unión de categorías; deduplicada y ordenada alfabéticamente.
 */
const verduras = [
  'acelga', 'ajo', 'alcachofa', 'apio', 'berenjena', 'boniato', 'broccoli',
  'brocoli', 'calabacín', 'calabaza', 'cardo', 'cebolla', 'cebolla morada',
  'cebollino', 'chirivía', 'col', 'col de bruselas', 'coliflor', 'endibia',
  'espárrago', 'espinaca', 'guisante', 'haba', 'judía verde', 'kale',
  'lechuga', 'nabo', 'pak choi', 'patata', 'pimiento', 'pimiento rojo',
  'porro', 'puerro', 'rábano', 'remolacha', 'repollo', 'ruibarbo',
  'setas', 'shiitake', 'tomate', 'tomate cherry', 'zanahoria',
];

const frutas = [
  'aguacate', 'arándano', 'banana', 'cereza', 'chirimoya', 'ciruela',
  'coco', 'frambuesa', 'fresa', 'granada', 'granada china', 'granada roja',
  'grapefruit', 'guayaba', 'higo', 'kiwi', 'lima', 'limón', 'mandarina',
  'mango', 'manzana', 'maracuyá', 'melocotón', 'melón', 'membrillo',
  'mora', 'naranja', 'papaya', 'pera', 'piña', 'plátano', 'pomelo',
  'sandía', 'toronja', 'uva',
];

const hierbas = [
  'albahaca', 'cilantro', 'eneldo', 'estragon', 'hierbabuena', 'laurel',
  'menta', 'orégano', 'perejil', 'romero', 'salvia', 'tomillo',
];

const lácteosHuevos = [
  'burrata', 'cheddar', 'crema agria', 'crema de leche', 'cuajada',
  'emmental', 'gruyère', 'huevos', 'kefir', 'leche', 'leche condensada',
  'leche evaporada', 'mantequilla', 'margarina', 'mozzarella', 'nata',
  'parmesano', 'queso', 'queso azul', 'queso crema', 'queso feta',
  'queso fresco', 'queso manchego', 'queso rallado', 'requesón',
  'ricotta', 'yogur', 'yogur griego',
];

const carnes = [
  'anchoas', 'arenque', 'atún', 'bacalao', 'beicon', 'caballa',
  'calamar', 'cangrejo', 'carne', 'carne de cerdo', 'carne picada',
  'cecina', 'chorizo', 'chuleta', 'codorniz', 'conejo', 'costillas',
  'cordero', 'embutido', 'foie', 'gallina', 'gamba', 'hamburguesa',
  'hígado', 'jamón', 'jamón ibérico', 'jamón serrano', 'langostino',
  'lenguado', 'lomo', 'longaniza', 'mejillón', 'merluza', 'morcilla',
  'ostras', 'panceta', 'pastrami', 'pavo', 'perca', 'pernil',
  'pechuga', 'pechuga de pollo', 'pesto', 'pollo', 'pulpo', 'rabas',
  'salami', 'salchicha', 'salchichón', 'salmón', 'sardinas',
  'sepia', 'sesos', 'ternera', 'tilapia', 'trucha', 'vacuno',
];

const granosLegumbres = [
  'almendra', 'amaranto', 'arroz', 'arroz basmati', 'arroz integral',
  'avena', 'azuki', 'cacahuete', 'cacahuete tostado', 'castaña',
  'chia', 'cuscús', 'espelta', 'farro', 'garbanzo', 'girasol',
  'harina', 'harina de trigo', 'lenteja', 'lenteja roja', 'lentejas',
  'linaza', 'maíz', 'maíz palomitas', 'maíz tierno', 'mijo',
  'nueces', 'pan rallado', 'pasta', 'pasta integral', 'patata',
  'pipas', 'pistacho', 'polenta', 'quinoa', 'semillas', 'semillas de amapola',
  'semillas de calabaza', 'semillas de girasol', 'semillas de lino',
  'sesamo', 'soja', 'trigo sarraceno', 'triticum',
];

const condimentos = [
  'aceite', 'aceite de coco', 'aceite de girasol', 'aceite de oliva',
  'aceite de sésamo', 'aioli', 'ají', 'azúcar', 'azúcar glas',
  'azúcar moreno', 'caldo', 'caldo de pollo', 'caldo de verduras',
  'canela', 'cardamomo', 'cayena', 'chile', 'chile en polvo',
  'clavo', 'comino', 'curry', 'curry en polvo', 'extracto de vainilla',
  'harissa', 'honey', 'miel', 'mostaza', 'mostaza dijon', 'nutella',
  'panko', 'pasta de curry', 'pasta de tomate', 'pimentón', 'pimienta',
  'pimienta negra', 'romesco', 'sal', 'sal marina', 'salsa bbq',
  'salsa de soja', 'salsa inglesa', 'salsa picante', 'tabasco',
  'tomate triturado', 'turmeric', 'curcuma', 'vinagre', 'vinagre balsámico',
  'vinagre de manzana', 'wasabi', 'zaatar',
];

const misc = [
  'arroz inflado', 'bizcocho', 'cacao en polvo', 'café', 'café molido',
  'chocolate', 'chocolate negro', 'colágeno', 'galletas', 'gelatina',
  'granola', 'jarabe de arce', 'jarabe de maíz', 'levadura',
  'levadura fresca', 'levadura química', 'levadura seca', 'palitos',
  'pasas', 'pasas de corinto', 'pellets', 'pipoca', 'sal marina fina',
  'sirope', 'tahini', 'tapioca', 'té', 'tofu', 'tofu firme',
  'tofu sedoso',   'vino blanco', 'vino de arroz', 'vino tinto',
];

export const INGREDIENTES_COMUNES = [...new Set([
  ...verduras,
  ...frutas,
  ...hierbas,
  ...lácteosHuevos,
  ...carnes,
  ...granosLegumbres,
  ...condimentos,
  ...misc,
])].sort((a, b) => a.localeCompare('es'));
