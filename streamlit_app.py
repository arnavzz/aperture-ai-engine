import streamlit as st
import requests

st.title("Aperture Content Augmentation Studio")

page_url = st.text_input("Page URL")
gap_query = st.text_input("Gap Query")

if st.button("Generate Augmentations"):
    resp = requests.post(
        "http://localhost:8000/api/augment",
        json={"page_url": page_url, "gap_query": gap_query}
    ).json()
    for bt, html in resp["augmentations"].items():
        st.subheader(bt.upper())
        st.markdown(html, unsafe_allow_html=True)