import { z } from 'zod';

import type { TreeBaseItem } from './TreeStructure';

export const NavItemSchema = z.object({
    label: z.string({ message: 'Niepoprawna nazwa' }).trim().min(1, 'Wypełnij to pole.'),
    url: z.string().trim().url('Niepoprawny adres url').or(z.literal('')).optional(),
});

export type NavItem = z.infer<typeof NavItemSchema>;

export type NavTreeItem = TreeBaseItem<string> & NavItem;
