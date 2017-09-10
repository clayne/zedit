import { lib, xelib } from './lib';
import { Fail, GetArray, GetStringArray, wcb } from './helpers';

// MASTER HANDLING METHODS
Object.assign(xelib, {
    CleanMasters: function(_id) {
        if (!lib.CleanMasters(_id))
            Fail(`Failed to clean masters in: ${_id}`);
    },
    SortMasters: function(_id) {
        if (!lib.SortMasters(_id))
            Fail(`Failed to sort masters in: ${_id}`);
    },
    AddMaster: function(_id, filename) {
        if (!lib.AddMaster(_id, wcb(filename)))
            Fail(`Failed to add master "${filename}" to file: ${_id}`);
    },
    GetMasters: function(_id) {
        return GetArray(function(_len) {
            if (!lib.GetMasters(_id, _len))
                Fail(`Failed to get masters for ${_id}`);
        });
    },
    GetMasterNames: function(_id) {
        return GetStringArray(function(_len) {
            if (!lib.GetMasterNames(_id, _len))
                Fail(`Failed to get master names for ${_id}`);
        });
    },
    AddAllMasters: function(_id) {
        let filename = xelib.Name(_id),
            loadedFiles = xelib.GetLoadedFileNames(_id),
            fileIndex = loadedFiles.indexOf(filename);
        for (let i = 0; i < fileIndex; i++) {
            let filename = loadedFiles[i];
            if (filename.endsWith('.Hardcoded.dat')) continue;
            xelib.AddMaster(_id, filename);
        }
    }
});