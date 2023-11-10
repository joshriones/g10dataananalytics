import streamlit as st
import pandas as pd
import altair as alt

# Sample data
data = "Data-Analytics-Merged-CSV.csv"
df = pd.read_csv(data)

# Drop NaN values
df.dropna(inplace=True)

# Calculate average duration per activity type
average_duration_df = df.groupby('Activity Description')['Duration'].mean().reset_index()

# Sort DataFrame by average duration
average_duration_df = average_duration_df.sort_values(by='Duration', ascending=False)

# Define a color scale
color_scale = alt.Scale(domain=average_duration_df['Activity Description'].unique(), range=['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22', '#17becf'])

# Create bar chart for average duration with color encoding
bar_chart = alt.Chart(average_duration_df).mark_bar().encode(
    x=alt.X('Activity Description', sort='-y', axis=alt.Axis(labelAngle=0)),
    y='Duration',
    color=alt.Color('Activity Description', scale=color_scale),
).properties(
    title=alt.TitleParams(text='Average Duration per Activity Type', fontSize=30, anchor='middle'),
    width=600,  # Adjust the width
    height=300  # Adjust the height
)

# Create a bar chart for 'Value (high, medium, low, none)' with color encoding
value_chart = alt.Chart(df).mark_bar().encode(
    x=alt.X('Value:N', axis=alt.Axis(labelAngle=0)),
    y='count()',
    color='Mood:N',
    tooltip=['Value', 'Mood']
).properties(
    title=alt.TitleParams(text='Value with Mood Variation', fontSize=20, anchor='middle'),
    width=600,  # Adjust the width
    height=300  # Adjust the height
)

# Display the charts using Streamlit
st.title('Group 10 Merged Dataset')
st.markdown("<p style='margin-bottom:30px'></p>", unsafe_allow_html=True) 

# Display the bar chart for average duration
st.altair_chart(bar_chart, use_container_width=True)

# Display the bar chart for 'Value (high, medium, low, none)'
st.altair_chart(value_chart, use_container_width=True)
