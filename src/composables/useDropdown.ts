import { ref, type Ref, onMounted, onUnmounted } from 'vue';

export const useDropdown = (collapseByClickIn: boolean = true) => {
  onMounted(() => window.addEventListener('click', handleClickOutside, false));
  onUnmounted(() => window.removeEventListener('click', handleClickOutside, false));

  const collapsed: Ref<boolean> = ref(false);

  const collapse = function(event: Event) {
    event.stopPropagation();
    collapsed.value = !collapsed.value;
  };

  let cursorInDropedList: boolean = false;

  const setCursorInDropedList = (value: boolean) => {
    cursorInDropedList = value;
  };

  const handleClickOutside = () => {
    if (collapseByClickIn) {
      if (!(!cursorInDropedList && !collapsed.value)) {
        collapsed.value = false;
      }
    } else {
      if (!cursorInDropedList && collapsed.value) {
        collapsed.value = false;
      }
    }
  };

  return {
    collapsed,
    collapse,
    setCursorInDropedList
  };
};
