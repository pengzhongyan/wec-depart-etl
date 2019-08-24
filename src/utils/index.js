export const awaitWrap = promise =>
    promise
        .then(res => {
            if (res.status === 200 && res.data.code == 0) {
                return [null, res.data.datas];
            }
            return [res.data.message, null];
        })
        .catch(err => {
            const msg = typeof err === "object" ? err.message : err;
            return [msg, null];
        });
