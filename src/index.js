import './scss/index.scss';
import {Excel} from '@/components/excel/Excel';
import {Header} from '@/components/header/Header';
import {Toolbar} from '@/components/toolbar/Toolbar';
import {Formula} from '@/components/formula/Formula';
import {Table} from '@/components/table/Table';
import {createStore} from '@core/createStore';
import {rootReducer} from '@/store/rootReducer';
import {storage, debounce} from '@core/utils';
import {initialState} from '@/store/initialState';
import {StoreSubscriber} from '@core/StoreSubscriber';
import {Emitter} from '@core/Emitter';

const store = createStore(rootReducer, initialState);

const stateListener = debounce(state => {
  console.log('App state', state);
  storage('excel-state', state);
}, 300);

store.subscribe(stateListener);

const excel = new Excel('#app', {
  components: [Header, Toolbar, Formula, Table],
  store,
  storeSubscriber: new StoreSubscriber(store),
  emitter: new Emitter(),
});

excel.render();
