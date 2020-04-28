const baseUrl = 'http://localhost:5000/';

export const getAllMakesForYear = async (year) => {
	try {
		let response = await fetch(`${baseUrl}specs/${year}/makes`);
		let modelArray = await response.json();
		return modelArray;
	} catch (error) {
		console.log(`Error fetching makes for ${year}: ${error}`);
	}
};

export const getAllModelsForYearAndMake = async (year, make) => {
	try {
		let response = await fetch(`${baseUrl}specs/${year}/makes/${make}`);
		let modelArray = await response.json();
		return modelArray;
	} catch (error) {
		console.log(`Error fetching models for ${year} ${make}: ${error}`);
	}
};

export const getSpecModelId = async (modelId) => {
	try {
		let response = await fetch(`${baseUrl}specs/${modelId}`);
		let spec = await response.json();
		return spec;
	} catch (error) {
		console.log(`Error fetching specs for ${modelId}: ${error}`);
	}
};

// for creating test data
//db['suspension-specs'].insert({	front: 0, rear: 0, year: 2018, make: 'Triumph', model: 'Street Triple RS' })
