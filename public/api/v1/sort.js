
        let quiz = await ctx.db.withTransaction(async tx => {

            if (!sort) {
                let maxSort = await tx.query("SELECT MAX(sort) as max \
                    FROM quiz WHERE user_id = ${user_id}", {
                        user_id: user.id
                    })
                    .then(res => res[0])
                    .then(res => res ? res.max : 0);
                sort = maxSort + 1;

            } else {

                sort = parseInt(sort);

                await tx.query("UPDATE quiz SET sort = sort + 1 \
                    WHERE user_id = ${userId} AND sort >= ${sort} ", { sort, userId: user.id });

            }

            return await tx.quiz.insert({ title: params.title, user_id: user.id, sort });

        });
