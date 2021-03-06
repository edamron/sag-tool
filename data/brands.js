export const Brands = [
	'Yamaha',
	'Honda',
	'Ducati',
	'Kawasaki',
	'BMW',
	'Suzuki',
	'Aprilia',
	'Triumph',
	'KTM',
];

/*
get distinct values for make in 2014
- db["suspension-specs"].distinct( "make", { year: 2014 } )
which returns [ "Aprilia", "BMW", "Ducati", "Honda", "KTM", "Suzuki" ]

get all the 2014 Decati models
- db["suspension-specs"].find({ year: 2014, make: 'Ducati' }, { model: 1 })
which returns { "_id" : ObjectId("5ea730dcbc29de287aad149a"), "model" : "Scrambler" }

a regular find, returning only make
db["suspension-specs"].find({ year: 2014 }, { make: 1 })

// to look up specs: https://www.motorcyclespecs.co.za/index.htm

the rows I added to the database:

db["suspension-specs"].insertMany([
	{ front: 0, rear: 0, year: 2016, make: 'Yamaha', model: 'MT-09' },
	{ front: 0, rear: 0, year: 2015, make: 'Yamaha', model: 'Virago XV400' },
	{ front: 0, rear: 0, year: 2018, make: 'Yamaha', model: 'Venture' },
	{ front: 0, rear: 0, year: 2014, make: 'Honda', model: 'Transalp' },
	{ front: 0, rear: 0, year: 2017, make: 'Honda', model: 'CBR1000RR' },
	{ front: 0, rear: 0, year: 2019, make: 'Honda', model: 'RC212V' },
	{ front: 0, rear: 0, year: 2018, make: 'Honda', model: 'CB1300' },
	{ front: 0, rear: 0, year: 2020, make: 'Ducati', model: 'Monster 696' },
	{ front: 0, rear: 0, year: 2013, make: 'Ducati', model: 'Panigale V4' },
	{ front: 0, rear: 0, year: 2014, make: 'Ducati', model: 'Scrambler' },
	{ front: 0, rear: 0, year: 2015, make: 'Ducati', model: '1198' },
	{ front: 0, rear: 0, year: 2016, make: 'Kawasaki', model: 'Vulcan' },
	{ front: 0, rear: 0, year: 2017, make: 'Kawasaki', model: '800 Classic' },
	{ front: 0, rear: 0, year: 2018, make: 'Kawasaki', model: 'KLR650' },
	{ front: 0, rear: 0, year: 2019, make: 'Kawasaki', model: 'Versys' },
	{ front: 0, rear: 0, year: 2020, make: 'BMW', model: 'R 1250 RS' },
	{ front: 0, rear: 0, year: 2014, make: 'BMW', model: 'K 1600 GT' },
	{ front: 0, rear: 0, year: 2014, make: 'BMW', model: 'F800GT' },
	{ front: 0, rear: 0, year: 2014, make: 'BMW', model: 'HP4 Race' },
	{ front: 0, rear: 0, year: 2014, make: 'Suzuki', model: 'GSX-R1000' },
	{ front: 0, rear: 0, year: 2016, make: 'Suzuki', model: 'Boulevard C90' },
	{ front: 0, rear: 0, year: 2018, make: 'Suzuki', model: 'DR650' },
	{ front: 0, rear: 0, year: 2017, make: 'Suzuki', model: 'SV650' },
	{ front: 0, rear: 0, year: 2018, make: 'Aprilia', model: 'Tuono 100R' },
	{ front: 0, rear: 0, year: 2019, make: 'Aprilia', model: 'RSV4' },
	{ front: 0, rear: 0, year: 2020, make: 'Aprilia', model: 'SL 750' },
    { front: 0, rear: 0, year: 2014, make: 'Aprilia', model: 'SR50' }
])
db["suspension-specs"].insertMany([
    { front: 0, rear: 0, year: 2015, make: 'Triumph', model: 'Street Triple RS' },
	{ front: 0, rear: 0, year: 2016, make: 'Triumph', model: 'Speed Triple' },
	{ front: 0, rear: 0, year: 2017, make: 'Triumph', model: 'Thruxton' },
	{ front: 0, rear: 0, year: 2018, make: 'Triumph', model: 'Bonneville' },
	{ front: 0, rear: 0, year: 2019, make: 'KTM', model: '1290 Super Duke' },
	{ front: 0, rear: 0, year: 2020, make: 'KTM', model: '690 Enduro' },
	{ front: 0, rear: 0, year: 2014, make: 'KTM', model: '390 Adventure' },
	{ front: 0, rear: 0, year: 2015, make: 'KTM', model: '890 Duke R' }    
])
*/

export const Brands2 = [
	{ front: 0, rear: 0, year: 2020, make: 'Yamaha', model: 'FZ1' },
	{ front: 0, rear: 0, year: 2016, make: 'Yamaha', model: 'MT-09' },
	{ front: 0, rear: 0, year: 2015, make: 'Yamaha', model: 'Virago XV400' },
	{ front: 0, rear: 0, year: 2018, make: 'Yamaha', model: 'Venture' },
	{ front: 0, rear: 0, year: 2014, make: 'Honda', model: 'Transalp' },
	{ front: 0, rear: 0, year: 2017, make: 'Honda', model: 'CBR1000RR' },
	{ front: 0, rear: 0, year: 2019, make: 'Honda', model: 'RC212V' },
	{ front: 0, rear: 0, year: 2018, make: 'Honda', model: 'CB1300' },
	{ front: 0, rear: 0, year: 2020, make: 'Ducati', model: 'Monster 696' },
	{ front: 0, rear: 0, year: 2013, make: 'Ducati', model: 'Panigale V4' },
	{ front: 0, rear: 0, year: 2014, make: 'Ducati', model: 'Scrambler' },
	{ front: 0, rear: 0, year: 2015, make: 'Ducati', model: '1198' },
	{ front: 0, rear: 0, year: 2016, make: 'Kawasaki', model: 'Vulcan' },
	{ front: 0, rear: 0, year: 2017, make: 'Kawasaki', model: '800 Classic' },
	{ front: 0, rear: 0, year: 2018, make: 'Kawasaki', model: 'KLR650' },
	{ front: 0, rear: 0, year: 2019, make: 'Kawasaki', model: 'Versys' },
	{ front: 0, rear: 0, year: 2020, make: 'BMW', model: 'R 1250 RS' },
	{ front: 0, rear: 0, year: 2014, make: 'BMW', model: 'K 1600 GT' },
	{ front: 0, rear: 0, year: 2014, make: 'BMW', model: 'F800GT' },
	{ front: 0, rear: 0, year: 2014, make: 'BMW', model: 'HP4 Race' },
	{ front: 0, rear: 0, year: 2014, make: 'Suzuki', model: 'GSX-R1000' },
	{ front: 0, rear: 0, year: 2016, make: 'Suzuki', model: 'Boulevard C90' },
	{ front: 0, rear: 0, year: 2018, make: 'Suzuki', model: 'DR650' },
	{ front: 0, rear: 0, year: 2017, make: 'Suzuki', model: 'SV650' },
	{ front: 0, rear: 0, year: 2018, make: 'Aprilia', model: 'Tuono 100R' },
	{ front: 0, rear: 0, year: 2019, make: 'Aprilia', model: 'RSV4' },
	{ front: 0, rear: 0, year: 2020, make: 'Aprilia', model: 'SL 750' },
	{ front: 0, rear: 0, year: 2014, make: 'Aprilia', model: 'SR50' },
	{
		front: 0,
		rear: 0,
		year: 2015,
		make: 'Triumph',
		model: 'Street Triple RS',
	},
	{ front: 0, rear: 0, year: 2016, make: 'Triumph', model: 'Speed Triple' },
	{ front: 0, rear: 0, year: 2017, make: 'Triumph', model: 'Thruxton' },
	{ front: 0, rear: 0, year: 2018, make: 'Triumph', model: 'Bonneville' },
	{ front: 0, rear: 0, year: 2019, make: 'KTM', model: '1290 Super Duke' },
	{ front: 0, rear: 0, year: 2020, make: 'KTM', model: '690 Enduro' },
	{ front: 0, rear: 0, year: 2014, make: 'KTM', model: '390 Adventure' },
	{ front: 0, rear: 0, year: 2015, make: 'KTM', model: '890 Duke R' },
];
