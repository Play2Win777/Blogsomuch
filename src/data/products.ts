import { Product } from '../types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Cosmic Voyager X1',
    price: 299.99,
    description: 'Experience the future with our flagship hoverboard, featuring quantum stabilization and neural sync technology.',
    images: [
      'https://images.unsplash.com/photo-1530893609608-32a9af3aa95c?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=800'
    ],
    glowType: 'gadgets', // Manually define the glow type
  },
  {
    id: '2',
    name: 'NeuroLink Pro',
    price: 499.99,
    description: 'Direct neural interface with quantum computing core, enabling seamless mind-machine interaction.',
    images: [
      'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1526406915894-7bcd65f60845?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1478860409698-8707f313ee8b?auto=format&fit=crop&q=80&w=800'
    ],
    glowType: 'tools', // Manually define the glow type
  },
  {
    id: '3',
    name: 'Quantum Lens',
    price: 799.99,
    description: 'Revolutionary AR glasses with quantum rendering and holographic display technology.',
    images: [
      'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1561883088-039e53143d73?auto=format&fit=crop&q=80&w=800'
    ],
    glowType: 'gadgets', // Manually define the glow type
  },
  {
    id: '4',
    name: 'Cybernetic Echo',
    price: 399.99,
    description: 'Next-gen neural audio interface with quantum sound processing and telepathic playlist control.',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1520170350707-b2da59970118?auto=format&fit=crop&q=80&w=800'
    ],
    glowType: 'cta', // Manually define the glow type
  }
];