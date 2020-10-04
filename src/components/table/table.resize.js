import {$} from '@core/dom';

export function resizeHandler(event, $root) {
  return new Promise(resolve => {
    const colTypeResize = 'col';
    const $resizer = $(event.target);
    const typeResize = $resizer.data.resize;
    $resizer.css({
      opacity: 1,
      [typeResize === colTypeResize ? 'bottom' : 'right']: '-3000px',
    });
    const $parent = $resizer.closest('[data-type="resizable"]');
    const coords = $parent.getCoords();
    const cells = $root.findAll(`[data-col="${$parent.data.col}"]`);
    let resizeValue;

    document.onmousemove = (e) => {
      if (typeResize === colTypeResize) {
        const deltaCol = Math.floor(e.pageX - coords.right);
        resizeValue = Math.floor(coords.width + deltaCol);
        $resizer.css({right: -deltaCol + 'px'});
      } else {
        const deltaRow = Math.floor(e.pageY - coords.bottom);
        resizeValue = Math.floor(coords.height + deltaRow);
        $resizer.css({bottom: -deltaRow + 'px'});
      }
    };

    document.onmouseup = () => {
      document.onmousemove = null;
      document.onmouseup = null;

      if (typeResize === colTypeResize) {
        $parent.css({width: resizeValue + 'px'});
        cells.forEach((el) => $(el).css({width: resizeValue + 'px'}));
      } else {
        $parent.css({height: resizeValue + 'px'});
      }

      resolve({
        value: resizeValue,
        id: $parent.data[typeResize],
        typeResize: typeResize,
      });

      $resizer.css({
        opacity: 0,
        bottom: 0,
        right: 0,
      });
    };
  });
}
