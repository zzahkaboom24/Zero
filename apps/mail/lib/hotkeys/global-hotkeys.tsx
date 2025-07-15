import { useCommandPalette } from '@/components/context/command-palette-context';
import { useOptimisticActions } from '@/hooks/use-optimistic-actions';
import { addComposeTabAtom } from '@/store/composeTabsStore';
import { keyboardShortcuts } from '@/config/shortcuts';
import { useShortcuts } from './use-hotkey-utils';
import { useQueryState } from 'nuqs';
import { useSetAtom } from 'jotai';

export function GlobalHotkeys() {
  const [, setComposeOpen] = useQueryState('isComposeOpen');
  const { clearAllFilters } = useCommandPalette();
  const [, setIsCommandPaletteOpen] = useQueryState('isCommandPaletteOpen');
  const { undoLastAction } = useOptimisticActions();
  const addTab = useSetAtom(addComposeTabAtom);
  const scope = 'global';

  const handlers = {
    newEmail: () => addTab({}),
    commandPalette: () => setIsCommandPaletteOpen('true'),
    clearAllFilters: () => clearAllFilters(),
    undoLastAction: () => {
      undoLastAction();
    },
  };

  const globalShortcuts = keyboardShortcuts.filter((shortcut) => shortcut.scope === scope);

  useShortcuts(globalShortcuts, handlers, { scope });

  return null;
}
