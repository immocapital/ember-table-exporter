import { set }    from '@ember/object';
import Controller from '@ember/controller';

export default Controller.extend({
  init(...args) {
    this._super(...args);

    set(this, 'myData', [
      { date: 'yesterday', rain: 'yes' },
      { date: 'tomorrow',  rain: 'no'  },
    ]);
  },
});
