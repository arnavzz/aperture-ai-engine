from mabwiser.mab import MAB, EpsilonGreedy

arms = ["headline_v1", "headline_v2", "faq_set1", "faq_set2"]
bandit = MAB(arms, learner=EpsilonGreedy(epsilon=0.1))

def pick_variant():
    return bandit.predict()  # chooses an arm

def update_reward(arm: str, reward: float):
    bandit.learn(arm, reward)
