const { User } = require('../models/userModel');

// Mostra página de friends
const renderFriends = async (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.redirect('/login');
    }

    try {
        const user = req.user;
        const userFriends = Array.isArray(user.friends) ? user.friends : []; // se estiver vazio, []. se não, podemos usar user.friends.

        const users = await User.find(
            { _id: { $in: userFriends } },
            'username profilePic'
        );

        const friends = [];
        for (const userDoc of users) {
            friends.push({
                id: userDoc._id,
                name: userDoc.username,
                profilePic: userDoc.profilePic
            });
        }

        res.render('friends', {
            title: 'Friends - MATRIOSCA',
            user: req.user,
            friends
        });
    } catch (err) {
        console.error('Erro ao carregar amigos:', err);
        res.render('friends', {
            title: 'Friends - MATRIOSCA',
            user: req.user,
            friends: [],
            friendMessage: 'An error occurred while loading friends.'
        });
    }
};

// Procurar outro utilizador pelo username
const searchAddFriend = async (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.redirect('/login');
    }

    const { username } = req.query;

    if (!username || typeof username !== 'string') {
        return res.render('friends', {
            title: 'Friends - MATRIOSCA',
            user: req.user,
            friends: [],
            friendMessage: 'Please provide a valid username.'
        });
    }

    const trimmedUsername = username.trim();

    try {
        const friendUser = await User.findByUsername(trimmedUsername);

        if (!friendUser) {
            // recarrega amigos antes de renderizar
            const userFriends = Array.isArray(req.user.friends) ? req.user.friends : [];
            const users = await User.find(
                { _id: { $in: userFriends } },
                'username profilePic'
            );

            const friends = [];
            for (const userDoc of users) {
                friends.push({
                    id: userDoc._id,
                    name: userDoc.username,
                    profilePic: userDoc.profilePic
                });
            }

            return res.render('friends', {
                title: 'Friends - MATRIOSCA',
                user: req.user,
                friends,
                friendMessage: 'User not found.'
            });
        }

        if (friendUser._id.toString() === req.user._id.toString()) {
            const userFriends = Array.isArray(req.user.friends) ? req.user.friends : [];
            const users = await User.find(
                { _id: { $in: userFriends } },
                'username profilePic'
            );

            const friends = [];
            for (const userDoc of users) {
                friends.push({
                    id: userDoc._id,
                    name: userDoc.username,
                    profilePic: userDoc.profilePic
                });
            }

            return res.render('friends', {
                title: 'Friends - MATRIOSCA',
                user: req.user,
                friends,
                friendMessage: 'You cannot add yourself as a friend.'
            });
        }

        if (req.user.friends.length >= 10 || friendUser.friends.length >= 10) {
            const userFriends = Array.isArray(req.user.friends) ? req.user.friends : [];
            const users = await User.find(
                { _id: { $in: userFriends } },
                'username profilePic'
            );

            const friends = [];
            for (const userDoc of users) {
                friends.push({
                    id: userDoc._id,
                    name: userDoc.username,
                    profilePic: userDoc.profilePic
                });
            }

            return res.render('friends', {
                title: 'Friends - MATRIOSCA',
                user: req.user,
                friends,
                friendMessage: 'Maximum of 10 friends reached on one side; cannot add friend.'
            });
        }

        const userFriends = Array.isArray(req.user.friends) ? req.user.friends : [];
        const friendFriends = Array.isArray(friendUser.friends) ? friendUser.friends : [];

        const userHasFriend = userFriends.some(id => id.toString() === friendUser._id.toString());
        const friendHasUser = friendFriends.some(id => id.toString() === req.user._id.toString());

        if (userHasFriend || friendHasUser) {
            const users = await User.find(
                { _id: { $in: userFriends } },
                'username profilePic'
            );

            const friends = [];
            for (const userDoc of users) {
                friends.push({
                    id: userDoc._id,
                    name: userDoc.username,
                    profilePic: userDoc.profilePic
                });
            }

            return res.render('friends', {
                title: 'Friends - MATRIOSCA',
                user: req.user,
                friends,
                friendMessage: 'This user is already your friend.'
            });
        }

        userFriends.push(friendUser._id);
        friendFriends.push(req.user._id);

        await User.findByIdAndUpdate(req.user._id, { friends: userFriends });
        await User.findByIdAndUpdate(friendUser._id, { friends: friendFriends });

        req.user.friends = userFriends;

        const users = await User.find(
            { _id: { $in: userFriends } },
            'username profilePic'
        );

        const friends = [];
        for (const userDoc of users) {
            friends.push({
                id: userDoc._id,
                name: userDoc.username,
                profilePic: userDoc.profilePic
            });
        }

        res.render('friends', {
            title: 'Friends - MATRIOSCA',
            user: req.user,
            friends,
            friendMessage: `${friendUser.username} added to friends.`
        });
    } catch (err) {
        console.error('Erro ao adicionar amigo:', err);
        res.render('friends', {
            title: 'Friends - MATRIOSCA',
            user: req.user,
            friends: [],
            friendMessage: 'An error occurred while adding the friend.'
        });
    }
};

module.exports = { renderFriends, searchAddFriend };