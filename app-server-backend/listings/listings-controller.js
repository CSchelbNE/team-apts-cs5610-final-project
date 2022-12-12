import * as dao from "./listing-dao.js";

export const ListingsController = (app) => {
    app.post("/listings/create", createListing);
    app.get("/listings/get-all/:id",getListingsById);
    app.get("/listings/single/:id", getListingByMongoId);
    app.get("/listings/recent", getMostRecentListings);
}

const createListing = async (req, res) => {
    const newListing = req.body;
    const returnedValue = await dao.pushListingToDB(newListing);
    return res.json(returnedValue)
}

const getListingsById = async (req, res) => {
    const listingId = parseInt(req.params.id);
    const listings = await dao.getAllListingsById(listingId);
    return res.json(listings);
}

const getListingByMongoId = async (req, res) => {
    const id = req.params.id;
    const listing = await dao.getListingByMongoID(id);
    return res.json(listing);
}

const getMostRecentListings = async (req, res) => {
    const listings = await dao.getMostRecentListings();
    return res.json(listings);
}


