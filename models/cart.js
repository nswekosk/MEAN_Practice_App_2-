var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CartSchema = new Schema({

	owner: { type: Schema.Types.ObjectId, ref: 'Product'},
	total : { type: Number, default: 0},
	items: [{

		item: { type: Schema.Types.ObjectId, ref: 'Product'},
		quantity: { type: Number, default: 1 },
		price: { type: Number, default: 0 }

	}];

});

export.modules = mongoose.model('Cart', CartSchema);