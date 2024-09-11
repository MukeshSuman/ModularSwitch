
import { ItemType } from '../types';
import Indicator from '../components/Indicator';
import Socket from "../components/Socket";
import MiniMCB from "../components/MiniMCB";
import Touch4Switch from "../components/Touch4Switch";
import Touch2Switch from "../components/Touch2Switch";
import TouchFan from "../components/TouchFan";
import Switch from "../components/Switch";
import Switch2 from "../components/Switch2";

export const modularItems: ItemType[] = [
    { id: 1, size: 'half', label: 'Full Item 1', name: 'Indicator', component: Indicator },
    { id: 2, size: 'half', label: 'Half Item 1', name: 'MiniMCB', component: MiniMCB },
    { id: 3, size: 'full', label: 'Half Item 2', name: 'Socket', component: Socket },
    { id: 4, size: 'full', label: 'Full Item 2', name: 'Touch4Switch', component: Touch4Switch },
    { id: 5, size: 'full', label: 'Full Item 2', name: 'Touch2Switch', component: Touch2Switch },
    { id: 6, size: 'full', label: 'Half Item 3', name: 'TouchFan', component: TouchFan },
    { id: 7, size: 'half', label: 'Half Item 4', name: 'Switch', component: Switch },
    { id: 8, size: 'half', label: 'Half Item 4', name: 'Switch2', component: Switch2 },

];