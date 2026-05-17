/**
 * Lista amplia de ingredientes comunes (ES) para autocomplete del generador.
<<<<<<< HEAD
 * Unión de categorías; deduplicada y ordenada alfabéticamente.
=======
 * Unión de categorías + términos alineados al catálogo sembrado (recetas elaboradas);
 * deduplicada y ordenada alfabéticamente.
 *
 * El match en API (`buscarRecetas`) es por igualdad exacta del nombre normalizado (minúsculas,
 * sin acentos); el chip debe coincidir con `ingredientes.nombre` en BD, no con prefijos.
>>>>>>> 2a31594 (Fea: ajustes en  back en vistas, nueva vistas)
 */
const verduras = [
  'acelga', 'ajo', 'alcachofa', 'apio', 'berenjena', 'boniato', 'broccoli',
  'brocoli', 'calabacín', 'calabaza', 'cardo', 'cebolla', 'cebolla morada',
  'cebollino', 'chirivía', 'col', 'col de bruselas', 'coliflor', 'endibia',
  'espárrago', 'espinaca', 'guisante', 'haba', 'judía verde', 'kale',
  'lechuga', 'nabo', 'pak choi', 'patata', 'pimiento', 'pimiento rojo',
  'porro', 'puerro', 'rábano', 'remolacha', 'repollo', 'ruibarbo',
  'setas', 'shiitake', 'tomate', 'tomate cherry', 'zanahoria','Tomates','Cebolla morada',
];

const frutas = [
  'aguacate', 'arándano', 'banana', 'cereza', 'chirimoya', 'ciruela',
  'coco', 'frambuesa', 'fresa', 'granada', 'granada china', 'granada roja',
  'grapefruit', 'guayaba', 'higo', 'kiwi', 'lima', 'limón', 'mandarina',
  'mango', 'manzana', 'maracuyá', 'melocotón', 'melón', 'membrillo',
  'mora', 'naranja', 'papaya', 'pera', 'piña', 'plátano', 'pomelo',
  'sandía', 'toronja', 'uva','Pepinos',
];

const hierbas = [
  'albahaca', 'cilantro', 'eneldo', 'estragon', 'hierbabuena', 'laurel',
  'menta', 'orégano', 'perejil', 'romero', 'salvia', 'tomillo',
];

const lácteosHuevos = [
 'huevos', 'leche', 'leche condensada',
  'leche evaporada', 'mantequilla', 'margarina','pan', 'queso', 
 'Queso', 'yogur', 'Panela',
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
  'chia', 'cuscús', 'espelta', 'farro', 'Garbanzo', 'girasol',
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
  'pimienta negra','oregano', 'romesco', 'sal', 'sal marina', 'salsa bbq',
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
<<<<<<< HEAD
  'tofu sedoso',   'vino blanco', 'vino de arroz', 'vino tinto',
=======
  'tofu sedoso', 'vino blanco', 'vino de arroz', 'vino tinto','pure de tomate',
];

/**
 * Principales y aliños que aparecen como filas en `receta_ingredientes` del seed
 * `seed-recetas-elaboradas` (scripts/recipe-elaboradas-data.mjs). Mantener alineado al sembrar.
 */
const catalogoRecetasElaboradas = [
  // Proteínas / vegetales principales (nombre en BD)
  'bacalao desalado', 'lubina', 'merluza negra', 'pulpo', 'calamar', 'vieiras', 'langostinos',
  'cangrejo real', 'bogavante', 'mejillones', 'almejas finas', 'pato magret', 'pollo de corral',
  'conejo',
  'ternera retinta', 'solomillo', 'costillar de cerdo ibérico', 'cordero lechal',
  'ciervo', 'buey madurado', 'foie gras', 'rinones', 'mollejas', 'rabo de toro',
  'carrillera',   'setas porcini', 'trufa negra', 'alcachofas', 'espárragos trigueros', 'cardo',
  'berenjenas', 'calabaza asada', 'coliflor', 'col romanesco', 'boniatos', 'yuca', 'quinoa roja',
  'lentejas caviar', 'garbanzos pedrosillano', 'arroz bomba', 'fregola',
  'tofu ahumado', 'tempeh', 'seitán', 'plátano macho',
  // Hierbas / ácidos / licores / especias (variantes en recetas)
  'perejil liso', 'limón confitado', 'lima kaffir', 'vinagre de jerez',
  'pomelo rosado', 'naranja sanguina', 'yuzu', 'verjus', 'uva moscatel',
  'oloroso', 'amontillado', 'pedro ximénez', 'oporto rubí', 'madeira', 'marsala',
  'noilly prat', 'cointreau', 'calvados', 'armagnac', 'brandy de jerez', 'vermut rojo',
  'azafrán en hebra', 'pimentón de la vera dulce', 'pasta de miso blanco',
  'curry madrás suave', 'zaatar tostado', 'shichimi togarashi',
  // Filas fijas del seed (nombres en tabla ingredientes)
  'aceite de oliva v.e.', 'chalota', 'vino blanco seco', 'miel de caña', 'caldo colado',
  'nata para cocinar', 'yema de huevo', 'guarnicion temporada', 'harina 00',
>>>>>>> 2a31594 (Fea: ajustes en  back en vistas, nueva vistas)
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
