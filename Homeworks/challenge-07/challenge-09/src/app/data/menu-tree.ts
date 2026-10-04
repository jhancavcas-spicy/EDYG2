import { MenuNode } from '../models/menu-node';

// Raíz del árbol: solo agrupa los menús principales, no se muestra como opción
export const menuTree = new MenuNode('Menú principal', '/', 'AppComponent');

// Menús principales (hijos de la raíz)
const home = new MenuNode('Inicio', '/inicio', 'InicioComponent');
const users = new MenuNode('Usuarios', '/usuarios', 'UsuariosComponent');
const products = new MenuNode('Productos', '/productos', 'ProductosComponent');
const settings = new MenuNode('Configuración', '/configuracion', 'ConfiguracionComponent');

// Submenús de Usuarios
users.addChild(new MenuNode('Registrar usuario', '/usuarios/registrar', 'RegistrarUsuarioComponent'));
users.addChild(new MenuNode('Lista de usuarios', '/usuarios/lista', 'ListaUsuariosComponent'));

// Submenús de Productos
products.addChild(new MenuNode('Registrar producto', '/productos/registrar', 'RegistrarProductoComponent'));
products.addChild(new MenuNode('Lista de productos', '/productos/lista', 'ListaProductosComponent'));

// Se conectan los menús principales a la raíz
menuTree.addChild(home);
menuTree.addChild(users);
menuTree.addChild(products);
menuTree.addChild(settings);
