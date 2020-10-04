import {defaultDocumentTitle} from '@core/constants';

export function createHeader(state) {
  const buttons = [
    {
      icon: 'delete',
    },
    {
      icon: 'exit_to_app',
    },
  ];
  const title = state.documentTitle || defaultDocumentTitle;

  return `
    <input type="text" class="input" value="${title}" />
    <div>
      ${buttons.map(toButton).join('')}
    </div>
  `;
}

function toButton(button) {
  return `
    <div class="button">
          <i class="material-icons">${button.icon}</i>
    </div>
  `;
}
