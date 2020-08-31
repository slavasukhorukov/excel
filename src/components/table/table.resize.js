import {$} from '@core/dom';

export function resizeHandler(event, $root) {
  const $resizer = $(event.target);
  const typeResize = $resizer.data.resize;
  $resizer.css({
    opacity: 1,
    [typeResize === 'col' ? 'bottom' : 'right']: '-3000px',
  });
  const $parent = $resizer.closest('[data-type="resizable"]');
  const coords = $parent.getCoords();
  const cells = $root.findAll(`[data-col="${$parent.data.col}"]`);
  let resizeValue;

  document.onmousemove = (e) => {
    if (typeResize === 'col') {
      const deltaCol = Math.floor(e.pageX - coords.right);
      resizeValue = (coords.width + deltaCol) + 'px';
      $resizer.css({right: -deltaCol + 'px'});
    } else {
      const deltaRow = Math.floor(e.pageY - coords.bottom);
      resizeValue = coords.height + deltaRow;
      $resizer.css({bottom: -deltaRow + 'px'});
    }
  };

  document.onmouseup = () => {
    document.onmousemove = null;
    document.onmouseup = null;

    if (typeResize === 'col') {
      $parent.css({width: resizeValue});
      cells.forEach((el) => $(el).css({width: resizeValue}));
    } else {
      $parent.css({height: resizeValue + 'px'});
    }

    $resizer.css({
      opacity: 0,
      bottom: 0,
      right: 0,
    });
  };
}