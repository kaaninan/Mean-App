var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var usersSchema = new Schema({
	name: String,
	user: Schema.ObjectId
});

var sinavSchema = new Schema({
	id: Schema.ObjectId,
	sinav_kategori_id: Number,
	baslangic_tarihi: Date,
	bitis_tarihi: Date,
	sinif_if: Number,
	kontrol_edecek_hocalar: Array
});


var ListShema = new mongoose.Schema({
	name: String,
	items: Array
})

mongoose.model("db_sinavlar", sinavSchema);
mongoose.model("New", usersSchema);
module.exports = mongoose.model('Meetup',ListShema);
