---
title: "Dashboard Interaktif dengan Plotly & Dash"
track: data-science
module: 04-visualisasi
order: 2
level: intermediate
duration: 50
tags: [plotly, dash, dashboard, interaktif, visualisasi]
author: sandikodev
updated: 2026-04-17
---

# Dashboard Interaktif dengan Plotly & Dash

Dash adalah framework Python untuk membangun web dashboard analitik tanpa JavaScript.

## Plotly Express — Visualisasi Cepat

```python
import plotly.express as px
import pandas as pd
import numpy as np

# Data siswa
df = pd.DataFrame({
    "nama": [f"Siswa {i}" for i in range(100)],
    "nilai": np.random.normal(78, 10, 100).clip(0, 100),
    "kehadiran": np.random.uniform(70, 100, 100),
    "jurusan": np.random.choice(["IPA", "IPS", "Bahasa"], 100),
    "kelas": np.random.choice(["X", "XI", "XII"], 100),
    "lulus": np.random.choice([True, False], 100, p=[0.85, 0.15])
})

# Scatter dengan warna dan ukuran
fig = px.scatter(df, x="kehadiran", y="nilai",
    color="jurusan", size="nilai",
    hover_data=["nama", "kelas"],
    trendline="ols",
    title="Korelasi Kehadiran vs Nilai")
fig.show()

# Sunburst chart — hierarki
fig = px.sunburst(df, path=["kelas", "jurusan"],
    values="nilai", color="nilai",
    color_continuous_scale="RdYlGn",
    title="Distribusi Nilai per Kelas dan Jurusan")
fig.show()

# Animated scatter
fig = px.scatter(df_time, x="kehadiran", y="nilai",
    animation_frame="semester", animation_group="nama",
    color="jurusan", size="nilai",
    title="Perkembangan Nilai per Semester")
fig.show()
```

## Dash — Web Dashboard

```python
from dash import Dash, dcc, html, Input, Output
import plotly.express as px
import pandas as pd

app = Dash(__name__)

app.layout = html.Div([
    html.H1("Dashboard Akademik SMA UII", style={"textAlign": "center"}),

    html.Div([
        html.Label("Filter Jurusan:"),
        dcc.Dropdown(
            id="jurusan-filter",
            options=[{"label": j, "value": j} for j in ["Semua", "IPA", "IPS", "Bahasa"]],
            value="Semua",
            clearable=False
        ),
    ], style={"width": "30%", "margin": "20px auto"}),

    html.Div([
        dcc.Graph(id="scatter-plot"),
        dcc.Graph(id="histogram"),
    ], style={"display": "flex", "gap": "20px"}),

    dcc.Graph(id="bar-chart"),
])

@app.callback(
    [Output("scatter-plot", "figure"),
     Output("histogram", "figure"),
     Output("bar-chart", "figure")],
    Input("jurusan-filter", "value")
)
def update_charts(jurusan):
    filtered = df if jurusan == "Semua" else df[df["jurusan"] == jurusan]

    scatter = px.scatter(filtered, x="kehadiran", y="nilai",
        color="kelas", title="Kehadiran vs Nilai")

    hist = px.histogram(filtered, x="nilai", nbins=20,
        color="jurusan", title="Distribusi Nilai")

    bar = px.bar(
        filtered.groupby("kelas")["nilai"].mean().reset_index(),
        x="kelas", y="nilai", title="Rata-rata Nilai per Kelas"
    )

    return scatter, hist, bar

if __name__ == "__main__":
    app.run(debug=True)
```

## Latihan

Buat dashboard akademik lengkap dengan:
1. Filter: jurusan, kelas, semester
2. KPI cards: total siswa, rata-rata nilai, % kelulusan
3. Scatter: kehadiran vs nilai dengan trendline
4. Heatmap: korelasi antar mata pelajaran
5. Time series: tren nilai per semester
6. Deploy ke Render atau Railway (gratis)
