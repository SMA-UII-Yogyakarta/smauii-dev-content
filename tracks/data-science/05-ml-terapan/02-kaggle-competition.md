---
title: "Kaggle Competition — End-to-End"
track: data-science
module: 05-ml-terapan
order: 2
level: intermediate
duration: 60
tags: [kaggle, competition, xgboost, feature-engineering, ensemble]
author: sandikodev
updated: 2026-04-17
---

# Kaggle Competition — End-to-End

Kaggle adalah platform kompetisi data science terbesar — tempat terbaik untuk mengasah skill dan membangun portofolio.

## Setup Kaggle

```bash
pip install kaggle
# Download API key dari kaggle.com/settings
mkdir ~/.kaggle && mv kaggle.json ~/.kaggle/
chmod 600 ~/.kaggle/kaggle.json

# Download dataset
kaggle competitions download -c titanic
kaggle datasets download -d spscientist/students-performance-in-exams
```

## Titanic — Kompetisi Klasik

```python
import pandas as pd
import numpy as np
from sklearn.ensemble import GradientBoostingClassifier
from sklearn.model_selection import cross_val_score
import xgboost as xgb

# Load data
train = pd.read_csv("train.csv")
test = pd.read_csv("test.csv")

# Feature Engineering
def engineer_features(df):
    # Title dari nama
    df["Title"] = df["Name"].str.extract(r" ([A-Za-z]+)\.")
    df["Title"] = df["Title"].replace(
        ["Lady", "Countess", "Capt", "Col", "Don", "Dr", "Major",
         "Rev", "Sir", "Jonkheer", "Dona"], "Rare"
    )
    df["Title"] = df["Title"].replace({"Mlle": "Miss", "Ms": "Miss", "Mme": "Mrs"})

    # Family size
    df["FamilySize"] = df["SibSp"] + df["Parch"] + 1
    df["IsAlone"] = (df["FamilySize"] == 1).astype(int)

    # Age bins
    df["Age"].fillna(df["Age"].median(), inplace=True)
    df["AgeBin"] = pd.cut(df["Age"], bins=[0, 12, 18, 35, 60, 100],
                           labels=["Child", "Teen", "Adult", "Middle", "Senior"])

    # Fare bins
    df["Fare"].fillna(df["Fare"].median(), inplace=True)
    df["FareBin"] = pd.qcut(df["Fare"], 4, labels=["Low", "Mid", "High", "VHigh"])

    return df

train = engineer_features(train)
test = engineer_features(test)

# Encode
from sklearn.preprocessing import LabelEncoder
for col in ["Sex", "Embarked", "Title", "AgeBin", "FareBin"]:
    le = LabelEncoder()
    train[col] = le.fit_transform(train[col].astype(str))
    test[col] = le.transform(test[col].astype(str))

features = ["Pclass", "Sex", "Age", "SibSp", "Parch", "Fare",
            "Embarked", "Title", "FamilySize", "IsAlone", "AgeBin", "FareBin"]

X = train[features]
y = train["Survived"]
X_test = test[features]

# Model
model = xgb.XGBClassifier(
    n_estimators=500,
    max_depth=5,
    learning_rate=0.05,
    subsample=0.8,
    colsample_bytree=0.8,
    random_state=42
)

# Cross-validation
cv_scores = cross_val_score(model, X, y, cv=5, scoring="accuracy")
print(f"CV Accuracy: {cv_scores.mean():.4f} ± {cv_scores.std():.4f}")

# Train & predict
model.fit(X, y)
predictions = model.predict(X_test)

# Submit
submission = pd.DataFrame({
    "PassengerId": test["PassengerId"],
    "Survived": predictions
})
submission.to_csv("submission.csv", index=False)
```

## Ensemble Methods

```python
from sklearn.ensemble import VotingClassifier, StackingClassifier
from sklearn.linear_model import LogisticRegression

# Voting — gabungkan prediksi beberapa model
voting = VotingClassifier([
    ("xgb", xgb.XGBClassifier()),
    ("rf", RandomForestClassifier()),
    ("gb", GradientBoostingClassifier()),
], voting="soft")

# Stacking — model meta belajar dari prediksi model base
stacking = StackingClassifier(
    estimators=[
        ("xgb", xgb.XGBClassifier()),
        ("rf", RandomForestClassifier()),
    ],
    final_estimator=LogisticRegression()
)
```

## Latihan

1. Daftar di Kaggle dan join kompetisi Titanic
2. Implementasi pipeline di atas
3. Target: top 20% leaderboard (accuracy > 0.79)
4. Tulis notebook yang rapi dan publish ke Kaggle
