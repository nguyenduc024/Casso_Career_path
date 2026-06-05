export interface ElementPosition {
  x: number;
  y: number;
  width: number;
  height: number;
}

/** Tọa độ tâm phần tử trong container — ổn định hơn khi in (không phụ thuộc transform scale) */
export function getPositionInContainer(
  container: HTMLElement,
  element: HTMLElement
): ElementPosition {
  let x = 0;
  let y = 0;
  let node: HTMLElement | null = element;

  while (node && node !== container) {
    x += node.offsetLeft;
    y += node.offsetTop;
    node = node.offsetParent as HTMLElement | null;
    if (node && node !== container && !container.contains(node)) {
      return fromBoundingRect(container, element);
    }
  }

  if (node === container) {
    return {
      x: x + element.offsetWidth / 2,
      y: y + element.offsetHeight / 2,
      width: element.offsetWidth,
      height: element.offsetHeight,
    };
  }

  return fromBoundingRect(container, element);
}

function fromBoundingRect(container: HTMLElement, element: HTMLElement): ElementPosition {
  const containerRect = container.getBoundingClientRect();
  const rect = element.getBoundingClientRect();
  return {
    x: rect.left - containerRect.left + rect.width / 2,
    y: rect.top - containerRect.top + rect.height / 2,
    width: rect.width,
    height: rect.height,
  };
}
