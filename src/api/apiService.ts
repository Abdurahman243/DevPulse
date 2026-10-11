export const fetchRestMetrics = async () => {
    return {
        activeRepos: 12,
        deploymentsToday: 5,
        restApiStatus: 'statusOk',
    };
};

export const fetchGraphqlActivity = async () => {
    return {
        data: {
            graphqlStatus: 'statusActive',
            recentCommits: [
                { id: 1, author: 'Alex Chen', message: 'commit1', timestamp: '10m ago' },
                { id: 2, author: 'Sarah Jenkins', message: 'commit2', timestamp: '1h ago' },
            ],
        },
    };
};