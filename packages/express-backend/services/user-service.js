import userModel from "../models/user.js";

function getUsers(name, job) {
    let promise;
    if (name === undefined && job === undefined) {
        promise = userModel.find();
    } else if (name && !job) {
        promise = findUserByName(name);
    } else if (job && !name) {
        promise = findUserByJob(job);
    }
    else {
        promise = findUserByNameAndJob(name, job);
    }
    return promise;
}

function findUserById(id) {
    return userModel.findById(id);
}

function addUser(user) {
    const userToAdd = new userModel(user);
    const promise = userToAdd.save();
    return promise;
}

function findUserByName(name) {
    return userModel.find({ name: name });
}

function findUserByJob(job) {
    return userModel.find({ job: job });
}

function findUserByNameAndJob(name, job) {
    return userModel.find({name: name, job: job});
}

function deleteUserById(id) {
    return userModel.findByIdAndDelete(id);
}

export default {
    addUser,
    getUsers,
    findUserById,
    deleteUserById,
};