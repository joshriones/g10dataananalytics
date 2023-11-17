import streamlit as st
import pandas as pd
import altair as alt

# Sample data
data = "Data-Analytics-Merged-CSV.csv"
df = pd.read_csv(data)

# Remove Streamlit page margin
st.set_page_config(layout="wide")

st.title('Team Visual Vista')

# Drop NaN values
df.dropna(inplace=True)

# Calculate average duration per activity type
average_duration_df = df.groupby('Activity Description')['Duration'].mean().reset_index()

# Sort DataFrame by average duration
average_duration_df = average_duration_df.sort_values(by='Duration', ascending=False)

# Define a color scale
color_scale = alt.Scale(domain=average_duration_df['Activity Description'].unique(),
                        range=['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22', '#17becf'])

# Create bar chart for average duration with color encoding
bar_chart = alt.Chart(average_duration_df).mark_bar().encode(
    x=alt.X('Activity Description', sort='-y', axis=alt.Axis(labelAngle=0)),
    y='Duration',
    color=alt.Color('Activity Description', scale=color_scale),
).properties(
    title=alt.TitleParams(text='Average Duration per Activity Type', fontSize=30, anchor='middle'),
    width=600,
    height=300
)

# Convert 'Value' column to categorical with custom order
value_order = ['High', 'Medium', 'Low']
df['Value'] = pd.Categorical(df['Value'], categories=value_order, ordered=True)

# Calculate average duration for each combination of 'Value' and 'Mood'
average_value_duration_df = df.groupby(['Value', 'Mood'])['Duration'].mean().reset_index()

# Create a bar chart for 'Value (high, medium, low, none)' with color encoding
value_chart = alt.Chart(average_value_duration_df).mark_bar().encode(
    x=alt.X('Value:N', axis=alt.Axis(labelAngle=0, title='Value'), sort=value_order),
    y='Duration',
    color='Mood:N',
    tooltip=['Value', 'Mood', 'Duration']  # Include duration in the tooltip
).properties(
    title=alt.TitleParams(text='Average Duration by Value and Mood', fontSize=20, anchor='middle'),
    width=600,
    height=300
)

# Display the average duration values horizontally
average_sleep_duration = df[df['Activity Description'] == 'Sleeping']['Duration'].mean()
average_activity_duration = df[df['Activity Description'] == 'School activities']['Duration'].mean()
average_entertainment_duration = df[df['Activity Description'] == 'Entertainment']['Duration'].mean()

# Display boxes for average durations
st.markdown("<h1 style='text-align: center;'>Average Durations</h1>", unsafe_allow_html=True)
st.markdown(
    f"<p style='text-align: center;'><strong>Average Sleep Duration:</strong> {round(average_sleep_duration, 2)} hours</p>",
    unsafe_allow_html=True)
st.markdown(
    f"<p style='text-align: center;'><strong>Average School Activity Duration:</strong> {round(average_activity_duration, 2)} hours</p>",
    unsafe_allow_html=True)
st.markdown(
    f"<p style='text-align: center;'><strong>Average Entertainment Duration:</strong> {round(average_entertainment_duration, 2)} hours</p>",
    unsafe_allow_html=True)

# Display the charts using Streamlit in a horizontal layout
col1, col2 = st.columns(2)

# Display the bar chart for average duration in the first column
col1.altair_chart(bar_chart, use_container_width=True)

# Display the bar chart for 'Value (High, Medium, Low)' in the second column
col2.altair_chart(value_chart, use_container_width=True)

# Create and display pie charts for all moods in a horizontal line
moods = df['Mood'].unique()
pie_charts = []

for mood in moods:
    filtered_df = df[df['Mood'] == mood]
    activity_counts = filtered_df['Activity Description'].value_counts().reset_index()
    activity_counts.columns = ['Activity', 'Count']

    # Sort by 'Count' in ascending order
    activity_counts = activity_counts.sort_values(by='Count', ascending=True)

    pie_chart = alt.Chart(activity_counts).mark_arc().encode(
        theta='Count:Q',
        color='Activity:N',
        tooltip=['Activity', 'Count']
    ).properties(
        title=alt.TitleParams(text=f'{mood} Mood', fontSize=20, anchor='middle'),
        width=200,
        height=200
    )

    pie_charts.append(pie_chart)

# Display the pie charts for all moods in a horizontal line
st.altair_chart(alt.hconcat(*pie_charts), use_container_width=True)
