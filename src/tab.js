const uuid = require('uuid/v1');
const { FORM_TYPE } = require('./constants/backendConstants');
const path = require('path');

class Tab {
    constructor(tab = {}, workspace) {
        this.workspace = workspace;
        this.id = tab.id || uuid();
        this.form = tab.form || {};
        this._formSaved = tab.formSaved !== undefined ? !!tab.formSaved : true;
        this.savedFormPath = tab.formAbsolutePath || this.form.path;
    }

    get formSaved() {
        return this._formSaved;
    }

    set formSaved(formSaved) {
        if (formSaved && this.form.path) {
            this.savedFormPath = path.resolve(this.workspace, this.form.path + '.json');
        }
        this._formSaved = formSaved;
    }

    get needReplaceForm() {
        return this.savedFormPath !== path.resolve(this.workspace, this.form.path + '.json');
    }

    adjustForm(changes = {}) {
        this.form = { ...this.form, ...changes };
        this.form.type = this.form.type || FORM_TYPE;
        this.form._id = this.form._id || uuid();
        this.formSaved = false;
    }
}

module.exports = Tab;