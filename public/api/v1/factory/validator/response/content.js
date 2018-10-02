module.exports = async (content, questions) => {

    let validContent = {};

    for (let question of questions) {

        let answer = content[question.id];
        let response = question.response;

        switch(response.type) {

            case 'single option':

                if (!response.options.includes(answer))
                    throw { code: 422, message: 'invalid answer specified' }

                break;
            case 'multiple options':

                if (Array.isArray(answer)) {

                    let subSet = answer.every(el => response.options.includes(el));

                    if (subSet) {

                        answer = answer.sort((a, b) => {
                            let aStr = JSON.stringify(a);
                            let bStr = JSON.stringify(b);
                            return aStr.localeCompare(bStr);
                        });

                    } else throw { code: 422, message: 'invalid answer specified' }

                } else throw { code: 422, message: 'invalid answer specified' }

                break;
            case 'sequence':

                if (Array.isArray(answer)) {

                    let subSet1 = answer.every(el => response.options.includes(el));
                    let subSet2 = response.options.every(el => answer.includes(el));

                    if (!subSet1 || !subSet2) throw { code: 422, message: 'invalid answer specified' }

                } else throw { code: 422, message: 'invalid answer specified' }

                break;
            default:
                throw { code: 500, message: 'invalid answer specified' }

        }

        validContent[question.id] = answer;
    }

    return validContent;

};
