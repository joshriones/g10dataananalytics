import streamlit as st
import pandas as pd
import altair as alt

# Sample data
df = pd.read_csv("/Users/joshua/Downloads/Data Analytics - Merged CSV.csv")

# Drop NaN values
df.dropna()

# Calculate average duration per activity type
average_duration_df = df.groupby('Activity Description')['Duration'].mean().reset_index()

# Sort DataFrame by average duration
average_duration_df = average_duration_df.sort_values(by='Duration', ascending=False)

# Define a color scale
color_scale = alt.Scale(domain=average_duration_df['Activity Description'].unique(), range=['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22', '#17becf'])

# Create bar chart for average duration with color encoding
chart = alt.Chart(average_duration_df).mark_bar().encode(
    x=alt.X('Activity Description', sort='-y', axis=alt.Axis(labelAngle=0)),
    y='Duration',
    color=alt.Color('Activity Description', scale=color_scale),
).properties(
    title=alt.TitleParams(text='Average Duration per Activity Type', fontSize=30,anchor='middle'),
    width=600,  # Adjust the width
    height=500  # Adjust the height
)

# Display the chart using Streamlit
st.title('Group 10 Merged Dataset')
st.markdown("<p style='margin-bottom:60px'></p>", unsafe_allow_html=True) 
st.altair_chart(chart, use_container_width=True)
